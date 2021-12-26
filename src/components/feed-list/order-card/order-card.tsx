import React, { FC } from 'react';
import styles from './order-card.module.css';
import { IOrderCardProps } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../ingredient-preview/ingredient-preview';

const OrderCard: FC<IOrderCardProps> = React.memo(({ data }) => {
  const reversedIngredients = data.ingredients.reverse().slice(0, 6);
  return (
    <article className={`${styles.root} pt-6 pb-6 pl-6 pr-6`}>
      <div className={styles.container}>
        <p className="text text_type_digits-default text_color_primary">
          #0{data.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {data.createdAt}
        </p>
      </div>
      <h2
        className={`${styles.name} text text_type_main-medium mt-6 mb-6 text_color_primary`}
      >
        {data.name}
      </h2>
      <div className={styles.container}>
        <ul className={styles.list}>
          {reversedIngredients.map((i, index) => (
            <li key={index} className={styles.item}>
              <IngredientPreview
                key={i._id}
                data={i}
                count={(index === 0 && data.ingredients.length - 6) as number}
              />
            </li>
          ))}
        </ul>
        <p className={styles.price}>
          <span className="text text_type_digits-default text_color_primary mr-2">
            {data.price}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </article>
  );
});

export default OrderCard;
