import rootStore from "store/RootStore";
import {
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";

type PrivateFields = "_search"

export default class SearchStore {
  private _search: string = "";

  constructor() {
    makeObservable<SearchStore, PrivateFields>(this, {
      _search: observable,
      search: computed,
      onChange: action,
      initSearch: action,
    });
  }

  get search(): string {
    return this._search;
  }

  onChange = (searchString: string) => {
    this._search = searchString;
  }

  initSearch = () => {
    const querySearch = rootStore.query.getParam("search");
    if (typeof querySearch === "string") {
      this._search = querySearch;
    }
  }
}