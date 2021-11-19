import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-schemas';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';

const IngredientCard = React.memo(({ data }) => {
  const location = useLocation();
  const { _id } = data;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id },
  });

  return (
    <Link
      to={`/ingredients/${_id}`}
      state={{ backgroundLocation: location }}
      className={styles.link}
      ref={dragRef}
    >
      <figure className={styles.figure}>
        <img src={data.image} alt={data.name} className={styles.picture} />
        {!!data.count && <Counter count={data.count} size="default" />}
        <p className={`${styles.price} mt-2 mb-2`}>
          <span className="text text_type_digits-default text_color_primary">
            {data.price}&nbsp;
          </span>
          <CurrencyIcon type="primary" />
        </p>
        <figcaption
          className={`text text_type_main-default text_color_primary ${styles.caption}`}
        >
          {data.name}
        </figcaption>
      </figure>
    </Link>
  );
});

IngredientCard.propTypes = {
  data: ingredientPropType.isRequired,
  quantity: PropTypes.number,
};

export default IngredientCard;
