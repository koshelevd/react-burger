import React, { useRef, FC } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';
import { useTopType } from '../../hooks/useTopType';
import { TIngredient, TIngredientType } from '../../utils/types';

const BurgerIngredients:FC = React.memo(() => {
  const { ingredients, types } = useSelector((state: RootStateOrAny) => ({
    ingredients: state.ingredients.all,
    types: state.ingredients.types,
  }));

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { listRef, onScroll, topType } = useTopType([
    bunRef,
    sauceRef,
    mainRef,
  ]);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={styles.tabs}>
        {types.map((type: TIngredientType) => {
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
                ref.current?.scrollIntoView({
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
        {types.map((type:TIngredientType, index: number) => {
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
                  .filter((i: TIngredient) => i.type === type.slug)
                  .map((i: TIngredient) => (
                    <li key={i._id}>
                      <IngredientCard data={i} />
                    </li>
                  ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
});

export default BurgerIngredients;
