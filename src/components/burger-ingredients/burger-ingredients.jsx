import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';
import { useTopType } from '../../hooks/useTopType';
import { setSelectedIngredient } from '../../services/slices/select-ingredient-slice';

const BurgerIngredients = React.memo(() => {
  const dispatch = useDispatch();
  const { ingredients, types, isModalOpen } = useSelector((state) => ({
    ingredients: state.ingredients.all,
    types: state.ingredients.types,
    isModalOpen: state.isModalOpen.ingredient,
  }));

  function handleIngredientClick(ingredient) {
    dispatch(setSelectedIngredient(ingredient));
  }

  const modal = (
    <Modal header="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const { listRef, onScroll, topType } = useTopType([
    bunRef,
    sauceRef,
    mainRef,
  ]);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

      <div className={styles.tabs}>
        {types.map((type) => {
          const ref =
            type.slug === 'bun'
              ? bunRef
              : type.slug === 'sauce'
              ? sauceRef
              : mainRef;
          return (
            <Tab
              key={type.slug}
              value={type.slug}
              active={type.slug === topType}
              onClick={() =>
                ref.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'nearest',
                })
              }
            >
              {type.title}
            </Tab>
          );
        })}
      </div>
      <div className={styles.scrollArea} ref={listRef} onScroll={onScroll}>
        {types.map((type, index) => {
          const ref =
            type.slug === 'bun'
              ? bunRef
              : type.slug === 'sauce'
              ? sauceRef
              : mainRef;
          return (
            <article
              key={index}
              className={`mt-10 ${styles.ingredients}`}
              ref={ref}
              id={type.slug}
            >
              <h2 className="text text_type_main-medium mb-6">{type.title}</h2>
              <ul className={`${styles.cards} pl-4`}>
                {ingredients
                  .filter((i) => i.type === type.slug)
                  .map((i) => (
                    <li key={i._id} onClick={() => handleIngredientClick(i)}>
                      <IngredientCard data={i} />
                    </li>
                  ))}
              </ul>
            </article>
          );
        })}
      </div>
      {isModalOpen && modal}
    </section>
  );
});

export default BurgerIngredients;
