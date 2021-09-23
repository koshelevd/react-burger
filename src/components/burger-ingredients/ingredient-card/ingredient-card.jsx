import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { ingredientPropType } from '../../../utils/prop-schemas';

function IngredientCard({ data, quantity }) {
  console.log('IngredientCard render');
  return (
    <figure className={styles.figure}>
      <img src={data.image} alt={data.name} className={styles.picture} />
      {quantity && <Counter count={1} size="default" />}
      <p className={`${styles.price} mt-2 mb-2`}>
        <span className="text text_type_digits-default">
          {data.price}&nbsp;
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <figcaption className={`text text_type_main-default ${styles.caption}`}>
        {data.name}
      </figcaption>
    </figure>
  );
}

IngredientCard.propTypes = {
  data: ingredientPropType.isRequired,
  quantity: PropTypes.number,
};

export default IngredientCard;
