import { useEffect } from "react";
import React from "react";

import ErrorMessage from "components/ErrorMessage";
import Loader, { LoaderSize } from "components/Loader";
import RecipeStore from "store/RecipeStore";
import { Meta } from "utils/types/meta";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./RecipePage.module.scss";
import Ingredients from "components/Ingredients";

const RecipePage: React.FC = () => {
  const recipeStore = useLocalStore(() => new RecipeStore());
  const navigate = useNavigate();
  useEffect(() => {
    recipeStore.getRecipe();
  }, [recipeStore]);

  return (
    <div className={styles.recipepage}>
      <Loader
        loading={recipeStore.meta === Meta.loading}
        size={LoaderSize.l}
        className={styles.loader}
      />
      {recipeStore.meta === Meta.error && (
        <ErrorMessage errorText={recipeStore.errorMessage} />
      )}
      {recipeStore.recipe && recipeStore.meta === Meta.success && (
        <div className={styles.recipe}>
          <div className={styles.recipe__imagecontainer}>
            <img
              src={recipeStore.recipe.image}
              alt={recipeStore.recipe.title}
              className={styles.recipe__imagecontainer__image}
            />
          </div>
          <button className={styles.recipe__back} onClick={() => navigate(-1)}>
            <span className={styles.recipe__back__arrow} />
          </button>
          <div className={styles.recipe__content}>
            <span className={styles.recipe__line} />
            <h2 className={styles.recipe__title}>
              {recipeStore.recipe.title}
            </h2>
            <div className={styles.recipe__numbers}>
              <div className={styles.recipe__numbers__minutes}>
                <span
                  className={styles.recipe__numbers__minutes__icon}
                />
                <p className={styles.recipe__numbers__minutes__text}>
                  {recipeStore.recipe.readyInMinutes} minutes
                </p>
              </div>
              <div className={styles.recipe__numbers__likes}>
                <span
                  className={styles.recipe__numbers__likes__icon}
                />
                <p className={styles.recipe__numbers__likes__text}>
                  {recipeStore.recipe.aggregateLikes} likes
                </p>
              </div>
            </div>
            <div className={styles.recipe__ingredients}>
              <div className={styles.recipe__heading}>Ingredients</div>
              <Ingredients ingredients={recipeStore.recipe.extendedIngredients} className={styles.recipe__ingredients__list}/>
            </div> 
            <div className={styles.recipe__method}>
              <div className={styles.recipe__heading}>Method</div>
              <div
                className={styles.recipe__text}  
                dangerouslySetInnerHTML={{ __html: recipeStore.recipe.instructions }}
              />           
            </div>
          </div>
          <div className={styles.recipe__information}>
          <div className={styles.recipe__heading}>About</div>
            <div        
              dangerouslySetInnerHTML={{ __html: recipeStore.recipe.summary }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(RecipePage);
