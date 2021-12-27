import React, { FC } from 'react';
import styles from './order-item.module.css';
import { IOrderItemProps } from '../../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../../feed-list/ingredient-preview/ingredient-preview';

const OrderItem: FC<IOrderItemProps> = React.memo(({ data }) => {
  return (
    <div className={`${styles.root} mb-4`}>
      <IngredientPreview data={data} />
      <h3 className={`${styles.title} text text_type_main-default ml-4`}>
        {data.name}
      </h3>
      <p className={styles.price}>
        <span className="text text_type_digits-default text_color_primary mr-2">
          {data.count} x {data.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
});

export default OrderItem;
