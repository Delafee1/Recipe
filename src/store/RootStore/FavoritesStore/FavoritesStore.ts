import { Recipe } from "utils/types/recipe";
import { action, computed, makeObservable, observable } from "mobx";
import rootStore from "store/RootStore";

type PrivateFields = 
  |"_favoriteRecipes" 
  | "_favoriteChecked" 
  | "_filteredFavoriteRecipes";

export default class FavoritesStore {
  private _favoriteRecipes: Recipe[] = [];
  private _favoriteChecked: boolean = false;
  private _filteredFavoriteRecipes: Recipe[] = [];

  constructor() {
    makeObservable<FavoritesStore, PrivateFields>(this, {
      _favoriteRecipes: observable,
      _favoriteChecked: observable,
      _filteredFavoriteRecipes: observable,
      filteredFavoriteRecipes: computed,
      favoriteChecked: computed,
      favoriteRecipes: computed,
      initFavorites: action,
      favoriteCheckboxToggle: action,
      addFavorite: action,
      deleteFavorite: action,
      filterFavoriteRecipes: action,
    });
  }

  get favoriteRecipes(): Recipe[] {  
    return this._favoriteRecipes;
  }

  get filteredFavoriteRecipes(): Recipe[] {
    return this._filteredFavoriteRecipes;
  }

  get favoriteChecked(): boolean {
    return this._favoriteChecked;
  }

  initFavorites = () => {
    const query = rootStore.query.getParam("favorites");
    if (query !== undefined) {
      this._favoriteChecked = true;
    }
  }

  filterFavoriteRecipes(search: string) {
    this._filteredFavoriteRecipes = this._favoriteRecipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(search);
    })
  }

  favoriteCheckboxToggle() {
    this._favoriteChecked = !this._favoriteChecked;
  }

  addFavorite(recipe: Recipe) {
    this._favoriteRecipes = this._favoriteRecipes.concat(recipe);
  }

  deleteFavorite(recipe: Recipe) {
    const index = this._favoriteRecipes.findIndex(el => el.id === recipe.id);
    this._favoriteRecipes.splice(index, 1);
    const indexFiltered = this._filteredFavoriteRecipes.findIndex(el => el.id === recipe.id);
    this._filteredFavoriteRecipes.splice(indexFiltered, 1);
  }
}
