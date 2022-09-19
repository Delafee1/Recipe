import React from "react";

import cn from "classnames";

import styles from "./Card.module.scss";
import { Recipe } from "utils/types/recipe";
import rootStore from "store/RootStore";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

type CardProps = {
  recipe: Recipe;
  className: string;
};

const Card: React.FC<CardProps> = ({
  recipe,
  className,
  ...props
}: CardProps) => {
  const {image, title, id, nutrition, diets} = recipe;

  const onClickPlus = (recipe: Recipe) => {
    rootStore.favorites.addFavorite(recipe);
  }

  const onClickMinus = (recipe: Recipe) => {
    rootStore.favorites.deleteFavorite(recipe);
  }

  const subtitleToString = () => {
    let subtitle = "";
    if (diets.length !== 0) {      
      for (const item of diets) {
        subtitle = `${item}, ${subtitle}`
      }
      subtitle = subtitle.substring(0, subtitle.length - 2);
    }
    return subtitle;
  }

  return (
    <div className={cn(styles.card, className)} {...props}>
      <Link to={`/recipe/?id=${id}`}>
        <div className={styles.card__imgcontainer}>
          <img src={image} alt={image} className={styles.card__image} />
        </div>       
        <h3 className={styles.card__title}>{title}</h3>
        <div className={styles.card__subtitle}>{subtitleToString()}</div>
      </Link>     
      <div className={styles.card__footer}>
        <div className={styles.card__footer__content}>
          {Math.round(nutrition.nutrients[0].amount)} kcal
        </div>
        {rootStore.favorites.favoriteRecipes.findIndex(el => el.id === id) === -1 && (
          <svg
            onClick={() => onClickPlus(recipe)}           
            className={styles.card__footer__plus}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FF0000"/>
            <line x1="11.8929" y1="6.75" x2="11.8929" y2="17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6.75" y1="12.1071" x2="17.25" y2="12.1071" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {rootStore.favorites.favoriteRecipes.findIndex(el => el.id === id) !== -1 && (
          <svg
            onClick={() => onClickMinus(recipe)}
            className={styles.card__footer__minus}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FF0000"/>
            <line x1="6.75" y1="12.1071" x2="17.25" y2="12.1071" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </div>
    </div>
  );
};

export default observer(Card);
