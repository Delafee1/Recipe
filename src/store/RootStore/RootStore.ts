import SearchStore from "./SearchStore";
import FavoritesStore from "./FavoritesStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly favorites = new FavoritesStore();
  readonly search = new SearchStore();
}
