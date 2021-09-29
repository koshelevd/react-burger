import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNSET_SELECTED_INGREDIENT } from '../../services/actions';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selectedIngredient);
  useEffect(() => () => dispatch({ type: UNSET_SELECTED_INGREDIENT }), [data]);

  return (
    <figure className={styles.root}>
      <img src={data.image_large} alt={data.name} className={styles.picture} />
      <figcaption className="text text_type_main-medium mt-4 mb-8">
        {data.name}
      </figcaption>
      <div className={`${styles.nutrients} text_color_inactive mb-5`}>
        <p className={`${styles.info} mr-5`}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span className="text text_type_digits-default">{data.calories}</span>
        </p>
        <p className={`${styles.info} mr-5`}>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">{data.proteins}</span>
        </p>
        <p className={`${styles.info} mr-5`}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">{data.fat}</span>
        </p>
        <p className={styles.info}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {data.carbohydrates}
          </span>
        </p>
      </div>
    </figure>
  );
}

export default IngredientDetails;
