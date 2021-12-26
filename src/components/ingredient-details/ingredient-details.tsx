import { useEffect, useState, FC } from 'react';
import { useParams, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';
import { TRootState } from '../../services/rootReducer';
import { useAppDispatch } from '../../services/store';

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const ingredients = useSelector((state: TRootState) => state.ingredients.all);
  const [data, setData] = useState<TIngredient | null>(null);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    const selectedIngredient: TIngredient | undefined = ingredients?.find(
      (i: TIngredient) => i._id === id,
    );
    if (!data && selectedIngredient) {
      setData(selectedIngredient);
    }
  }, [ingredients, data, id, dispatch]);

  return (
    <figure className={styles.root}>
      {!backgroundLocation && (
        <h2 className={`text text_type_main-large ${styles.header}`}>
          Детали ингредиента
        </h2>
      )}
      {data && (
        <>
          <img
            src={data.image_large}
            alt={data.name}
            className={styles.picture}
          />
          <figcaption className="text text_type_main-medium mt-4 mb-8">
            {data.name}
          </figcaption>
          <div className={`${styles.nutrients} text_color_inactive mb-5`}>
            <p className={`${styles.info} mr-5`}>
              <span className="text text_type_main-default">Калории,ккал</span>
              <span className="text text_type_digits-default">
                {data.calories}
              </span>
            </p>
            <p className={`${styles.info} mr-5`}>
              <span className="text text_type_main-default">Белки, г</span>
              <span className="text text_type_digits-default">
                {data.proteins}
              </span>
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
        </>
      )}
    </figure>
  );
};

export default IngredientDetails;
