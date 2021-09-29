import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_INGREDIENT,
  getIngredients,
} from '../../services/actions/ingredients';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';
import { SET_SELECTED_INGREDIENT } from '../../services/actions';

const BurgerIngredients = React.memo(() => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, types } = useSelector((state) => ({
    ingredients: state.ingredients.all,
    isLoading: state.ingredients.isRequestProcessing,
    types: state.ingredients.types,
  }));
  const state = useSelector((state) => state);

  const [currentTab, setCurrentTab] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  function handleModalToggle(ingredient) {
    if (ingredient) {
      dispatch({
        type: SET_SELECTED_INGREDIENT,
        ingredient,
      });

      dispatch({
        type: ADD_INGREDIENT,
        ingredient,
      });
    }
    setIsModalOpen(!isModalOpen);
  }

  const modal = (
    <Modal header="Детали ингредиента" onClose={handleModalToggle}>
      <IngredientDetails />
    </Modal>
  );

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

      <div className={styles.tabs}>
        {types.map((type) => (
          <Tab
            key={type.slug}
            value={type.slug}
            active={currentTab === type.slug}
            onClick={setCurrentTab}
          >
            {type.title}
          </Tab>
        ))}
      </div>
      <div className={styles.scrollArea}>
        {types.map((type, index) => (
          <article key={index} className={`mt-10 ${styles.ingredients}`}>
            <h2 className="text text_type_main-medium mb-6">{type.title}</h2>
            <ul className={`${styles.cards} pl-4`}>
              {ingredients
                .filter((i) => i.type === type.slug)
                .map((i) => (
                  <li key={i._id} onClick={() => handleModalToggle(i)}>
                    <IngredientCard data={i} />
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </div>
      {isModalOpen && modal}
    </section>
  );
});

export default BurgerIngredients;
