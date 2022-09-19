import React from "react";

import cn from "classnames";

import styles from "./Ingredients.module.scss";
import { Ingredient } from "utils/types/ingredient";

type IngredientsProps = {
  ingredients: Ingredient[];
  className?: string;
}

const Ingredients: React.FC<IngredientsProps> = ({
  ingredients,
  className
}: IngredientsProps) => {

  return (
    <div className={cn(styles.container, className)}>
      {ingredients.map((ingredient, index) => (
        <div className={styles.ingredients} key={index}>
          <div className={styles.ingredients__border}>
            <img 
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              className={styles.ingredients__image}
            />
          </div>
          <div className={styles.ingredients__amount}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Ingredients;
