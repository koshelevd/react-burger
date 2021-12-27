import React, { FC } from 'react';
import styles from './order-card.module.css';
import { IOrderCardProps, TIngredient } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { TRootState } from '../../../services/rootReducer';
import formatDate from '../../../utils/date';
import { useLocation } from 'react-router-dom';
import getStatus from '../../../utils/status';
import { useAppSelector } from '../../../services/store';

const OrderCard: FC<IOrderCardProps> = React.memo(({ data }) => {
  const location = useLocation();
  const showStatus = location.pathname.includes('/profile/orders');
  const statusColorStyle =
    data?.status === 'done' ? styles.statusDone : 'text_color_primary';

  const { allIngredients } = useAppSelector((state: TRootState) => ({
    allIngredients: state.ingredients.all,
  }));

  const ingredientsArray: Array<TIngredient | undefined> = [];
  data.ingredients.forEach((id) =>
    ingredientsArray.push(allIngredients?.find((i) => i._id === id)),
  );

  const price = ingredientsArray.reduce(
    (acc: number, val: any) => acc + val?.price,
    0,
  );

  const uniqueIngredients: Array<TIngredient> = [];
  ingredientsArray.forEach((ingredient) => {
    const finded = uniqueIngredients.find((i) => i._id === ingredient?._id);
    if (!finded && ingredient) uniqueIngredients.push(ingredient);
  });
  const reversedIngredients = uniqueIngredients.slice(0, 6).reverse();

  return (
    <article className={`${styles.root} pt-6 pb-6 pl-6 pr-6`}>
      <div className={styles.container}>
        <p className="text text_type_digits-default text_color_primary">
          #0{data.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(data.createdAt)}
        </p>
      </div>
      <h2
        className={`${styles.name} text text_type_main-medium mt-6 text_color_primary`}
      >
        {data.name}
      </h2>
      {showStatus && (
        <p className={`text text_type_main-default mt-2 ${statusColorStyle}`}>
          {getStatus(data.status)}
        </p>
      )}
      <div className={`${styles.container} mt-6`}>
        <ul className={styles.list}>
          {reversedIngredients.map(
            (i, index) =>
              i && (
                <li key={index} className={styles.item}>
                  <IngredientPreview
                    key={i._id}
                    data={i}
                    count={
                      (index === 0 &&
                        uniqueIngredients.length - 6 > 0 &&
                        uniqueIngredients.length - 6) as number
                    }
                  />
                </li>
              ),
          )}
        </ul>
        <p className={styles.price}>
          <span className="text text_type_digits-default text_color_primary mr-2">
            {price.toString()}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </article>
  );
});

export default OrderCard;
