import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.all);
  const [data, setData] = useState({});
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    const selectedIngredient = ingredients.find((i) => i._id === id);
    if (Object.keys(data).length === 0 && selectedIngredient) {
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
