import { Option } from "components/MultiDropdown";
import rootStore from "store/RootStore";
import { MEAL_TYPES } from "utils/constants/MealTypes";
import { ILocalStore } from "utils/useLocalStore";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields =
  | "_selectedCategories"
  | "_dropdownIsOpen"
  | "_availableCategories";

export default class CategoriesStore implements ILocalStore {
  private _selectedCategories: Option[] = [];
  private _dropdownIsOpen: boolean = false;
  private _availableCategories: Option[] = MEAL_TYPES;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _selectedCategories: observable,
      _availableCategories: observable,
      _dropdownIsOpen: observable,
      dropdownIsOpen: computed,
      selectedCategories: computed,
      availableCategories: computed,
      initCategories: action,
      dropdownToggle: action,
      dropdownClose: action,
      setSelectedCategoriesArray: action,
      getSelectedCategoriesString: action,
      setDropdownTitle: action,
      checkOption: action,
    });
  }

  get availableCategories(): Option[] {
    return this._availableCategories;
  }

  get selectedCategories(): Option[] {
    return this._selectedCategories;
  }

  get dropdownIsOpen(): boolean {
    return this._dropdownIsOpen;
  }

  initCategories = () => {
    const queryCategories = rootStore.query.getParam("categories");
    if (typeof queryCategories === "string") {
      if (queryCategories.length === 0) {
        this._selectedCategories = [];
      }
      const result = this._availableCategories.filter((val) =>
        queryCategories.split(",").includes(val.value)
      );
      this._selectedCategories = result;
    } else {
      this._selectedCategories = [];
    }
  };

  checkOption = (category: Option) => {
    return this._selectedCategories.findIndex(
      (val) => val.key === category.key
    );
  };

  setSelectedCategoriesArray(category: Option) {
    const selected = this.checkOption(category);
    if (selected === -1) {
      this._selectedCategories.push(category);
    } else {
      this._selectedCategories = this._selectedCategories.filter(
        (val, index) => index !== selected
      );
    }
  }

  getSelectedCategoriesString() {
    const categories = this.categoriesToString(this._selectedCategories, ",");
    return categories.substring(0, categories.length - 1);
  }

  setDropdownTitle() {
    if (this._selectedCategories.length === 0) {
      return "Pick categories";
    }
    const title = this.categoriesToString(this._selectedCategories, ", ");
    return title.substring(0, title.length - 2);
  }

  dropdownToggle() {
    this._dropdownIsOpen = !this._dropdownIsOpen;
  }

  dropdownClose() {
    this._dropdownIsOpen = false;
  }

  private categoriesToString(categories: Option[], separator: string): string {
    const string = categories.reduce(
      (acc, value) => `${acc}${value.value}${separator}`,
      ""
    );
    return string;
  }

  destroy(): void {}
}
