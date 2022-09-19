import rootStore from "store/RootStore";
import { apiKey } from "utils/api";
import { Meta } from "utils/types/meta";
import { Recipe } from "utils/types/recipe";
import { ILocalStore } from "utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { ParsedQs } from "qs";

type PrivateFields = "_recipes" | "_meta" | "_totalResults" | "_errorMessage";

export default class RecipesStore implements ILocalStore {
  private _meta: Meta = Meta.initial;
  private _recipes: Recipe[] = [];
  private _offset: number = 1;
  private _totalResults: number = 0;
  private _errorMessage: string = "";

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _meta: observable,
      _recipes: observable.ref,
      _totalResults: observable,
      _errorMessage: observable,
      totalResults: computed,
      meta: computed,
      recipes: computed,
      getRecipesList: action,
    });
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get totalResults(): number {
    return this._totalResults;
  }

  getRecipesList = async (
    category: string | string[] | ParsedQs | ParsedQs[] | undefined = "",
    search: string | string[] | ParsedQs | ParsedQs[] | undefined = "",
    reset: boolean = false
  ) => {
    this._meta = Meta.loading;
    if (rootStore.query.getParam("search") !== undefined) {
      search = `&query=${rootStore.query.getParam("search")}`;
    }
    if (rootStore.query.getParam("categories") !== undefined) {
      category = `&type=${rootStore.query.getParam("categories")}`;
    }
    if (reset) {
      this._offset = 1;
    }
    try {   
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&addRecipeNutrition=true&offset=${this._offset}${category}${search}`,
      });
      runInAction(() => {
        if (reset === true) {
          this._recipes = [];
        }
        this._meta = Meta.success;
        this._recipes = this._recipes.concat(result.data.results);
        this._offset = this._offset + result.data.results.length;
        this._totalResults = result.data.totalResults;
      });
    } catch (e: any) {
      runInAction(() => {
        this._meta = Meta.error;
        if (typeof(e.response.data.message) === "string") {
          this._errorMessage = e.response.data.message;
        }
      });
    }
  };

  destroy(): void {
    this._qpCategoryReaction();
  }

  private readonly _qpCategoryReaction: IReactionDisposer = reaction(
    () =>
      rootStore.query.params,
    () => {
      if (rootStore.query.getParam("favorites") === undefined) {
        this.getRecipesList(
          rootStore.query.getParam("categories"),
          rootStore.query.getParam("search"),
          true
        );
      }      
    }
  );
}
