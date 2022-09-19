import { ChangeEvent, useEffect } from "react";
import React from "react";

import rootStore from "store/RootStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.scss";

export type SearchProps = React.FormHTMLAttributes<HTMLInputElement>;

const Search: React.FC<SearchProps> = ({
  className,
  ...props
}: SearchProps) => {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    rootStore.search.initSearch();
  }, []);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootStore.search.onChange(e.target.value);
    rootStore.favorites.filterFavoriteRecipes(e.target.value);
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className={cn(className, styles.search)} >
      <label className={styles.search__icon}>
        <input 
          type="search"
          placeholder="Search"
          value={rootStore.search.search}
          onChange={handleChange}
          className={styles.search__input}
          {...props}
        />
      </label>
    </div>
  );
};

export default observer(Search);
