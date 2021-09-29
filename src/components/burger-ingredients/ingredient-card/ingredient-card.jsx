import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-schemas';
import styles from './ingredient-card.module.css';

function IngredientCard({ data }) {
  return (
    <figure className={styles.figure}>
      <img src={data.image} alt={data.name} className={styles.picture} />
      {!!data.count && <Counter count={data.count} size="default" />}
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
