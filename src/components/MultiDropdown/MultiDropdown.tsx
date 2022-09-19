import React from "react";

import CategoriesStore from "store/CategoriesStore";
import { useLocalStore } from "utils/useLocalStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  disabled?: boolean;
  className: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  disabled,
  className,
  ...props
}: MultiDropdownProps) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());
  const [searchParams, setSearchParams] = useSearchParams();

  categoriesStore.initCategories();
  
  const onClickHandler = (option: Option) => {
    categoriesStore.setSelectedCategoriesArray(option);
    searchParams.set("categories", categoriesStore.getSelectedCategoriesString());
    setSearchParams(searchParams);
  };

  return (
    <div
      className={cn(styles.multidropdown, className)}
      tabIndex={0}
      onBlur={() => categoriesStore.dropdownClose()}
      {...props}
    >
      <div
        className={cn(styles.multidropdown__title, {
          [styles.multidropdown__title_disabled]: disabled === true,
        })}       
        onClick={() => categoriesStore.dropdownToggle()}       
      >
        {categoriesStore.setDropdownTitle()}
      </div>
      {categoriesStore.dropdownIsOpen && !disabled && (
        <div className={styles.multidropdown__categories}>
          {categoriesStore.availableCategories.map((option) => (
            <div
              className={cn(styles.multidropdown__category, {
                [styles.multidropdown__category_checked]:
                  categoriesStore.checkOption(option) !== -1,
              })}
              key={option.key}
              onClick={() => {
                onClickHandler(option);
              }}
              {...props}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(MultiDropdown);
