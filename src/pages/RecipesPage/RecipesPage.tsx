import { useEffect } from "react";
import React from "react";

import Card from "components/Card";
import Loader, { LoaderSize } from "components/Loader";
import MultiDropdown from "components/MultiDropdown";
import Search from "components/Search";
import RecipesStore from "store/RecipesStore";
import { Meta } from "utils/types/meta";
import { useLocalStore } from "utils/useLocalStore";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./RecipesPage.module.scss";
import rootStore from "store/RootStore";
import Checkbox from "components/Checkbox";
import ErrorMessage from "components/ErrorMessage";

const RecipesPage: React.FC = () => {
  const recipesStore = useLocalStore(() => new RecipesStore());
 
  useEffect(() => {
    recipesStore.getRecipesList();
    rootStore.favorites.initFavorites();
  }, [recipesStore]);

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__heading}>
        <Search className={styles.recipes__heading__search} />
        <Checkbox 
          className={styles.recipes__heading__checkbox}
          checked={rootStore.favorites.favoriteChecked}
        />          
        <MultiDropdown
          disabled={rootStore.favorites.favoriteChecked}
          className={styles.recipes__heading__multidropdown}
        />
        <div className={styles.recipes__heading__results}>
          Total Results: {rootStore.favorites.favoriteChecked
            ? rootStore.favorites.filteredFavoriteRecipes.length 
            : recipesStore.totalResults}
        </div>
      </div>
      <Loader
        loading={recipesStore.meta === Meta.loading}
        size={LoaderSize.l}
        className={styles.loader}
      />
      {(recipesStore.totalResults === 0 &&
        recipesStore.meta === Meta.success) && (
        <ErrorMessage errorText="Sorry, no results were found." />
      )}
      {(rootStore.favorites.favoriteRecipes.length === 0 &&
        rootStore.favorites.favoriteChecked) && (
        <ErrorMessage errorText="You dont't have any favorite recipes." />
      )}
      {(rootStore.favorites.filteredFavoriteRecipes.length === 0 &&
        rootStore.favorites.favoriteRecipes.length !== 0 &&
        rootStore.favorites.favoriteChecked) && (
        <ErrorMessage errorText="Sorry, no results were found." />
      )}
      {recipesStore.meta === Meta.error &&
        !rootStore.favorites.favoriteChecked && (
        <ErrorMessage errorText={recipesStore.errorMessage} />
      )}
      <div>     
      {rootStore.favorites.favoriteChecked &&
        <div className={styles.recipes__cards}>
          {rootStore.favorites.filteredFavoriteRecipes.map((recipe, index) => (
            <Card
              key={index}
              recipe={recipe}
              className={styles.recipes__card}
            />
          ))}
        </div>
      }
      {!rootStore.favorites.favoriteChecked &&
        <InfiniteScroll
          className={cn(styles.recipes__cards, {
            [styles.recipes__cards_loading]: recipesStore.meta === Meta.loading,
          })}
          dataLength={recipesStore.recipes.length}
          next={recipesStore.getRecipesList}
          hasMore={true}
          loader={""}
        >         
          {!rootStore.favorites.favoriteChecked &&
            recipesStore.recipes.map((recipe, index) => (
              <Card
                key={index}
                recipe={recipe}
                className={styles.recipes__card}
              />
            ))
          }
        </InfiniteScroll>
      }
      </div>
    </div>
  );
};

export default observer(RecipesPage);
