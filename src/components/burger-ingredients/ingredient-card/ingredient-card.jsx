import React from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

function IngredientCard({ data, quantity }) {
  return (
    <figure className={styles.figure}>
      <img src={data.image} alt={data.name} className={styles.picture} />
      {quantity && <Counter count={1} size="default" />}
      <p className={`${styles.price} mt-2 mb-2`}>
        <span className="text text_type_digits-default">{data.price}&nbsp;</span>
        <CurrencyIcon type="primary" />
      </p>
      <figcaption className={`text text_type_main-default ${styles.caption}`}>
        {data.name}
      </figcaption>
    </figure>
  );
}
export default IngredientCard;
