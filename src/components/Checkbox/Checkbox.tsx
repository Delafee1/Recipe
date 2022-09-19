import React from "react";

import cn from "classnames";

import styles from "./Checkbox.module.scss";
import rootStore from "store/RootStore";
import { useSearchParams } from "react-router-dom";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<CheckBoxProps> = ({
  className,
  onChange,
  checked,
  disabled = false,
  ...props
}: CheckBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const onChangeCheckbox = () => {
    rootStore.favorites.favoriteCheckboxToggle();
    rootStore.favorites.favoriteChecked
      ? setSearchParams({"favorites": "true"}) 
      : setSearchParams("");  
    rootStore.search.onChange("");
    rootStore.favorites.filterFavoriteRecipes("");
  }

  return (
    <label className={cn(styles.checkbox__label, className)}>
      Favorites
      <input
          type="checkbox"
          onChange={onChangeCheckbox}
          checked={checked}
          disabled={disabled ? true : false}
          {...props}
      />
      <span className={cn(styles.checkbox__checkmark, {
          [styles.checkbox_disabled]: disabled === true,
      })}>
      </span>
  </label>
  )
}

export default React.memo(Checkbox);
