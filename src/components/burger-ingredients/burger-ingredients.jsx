import React, { useContext, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';
import { IngredientsContext } from '../../contexts/ingredients-context';
import { INGREDIENTS_TYPES } from '../../utils/data';

const BurgerIngredients = React.memo(() => {
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [types] = useState(INGREDIENTS_TYPES);
  const [currentTab, setCurrentTab] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  function addIngredient(ingredient) {
    if (ingredient.type === 'bun') {
      setIngredients((prevState) =>
        prevState.map((i) => {
          if (i._id === ingredient._id) {
            return { ...i, count: 1 };
          } else if (i.type === 'bun') {
            return { ...i, count: 0 };
          }
          return i;
        }),
      );
    } else {
      setIngredients((prevState) =>
        prevState.map((i) => {
          // console.log(ingredient);
          if (i._id === ingredient._id && !!i.count) {
            return { ...i, count: i.count + 1 };
          } else if (i._id === ingredient._id) {
            return { ...i, count: 1 };
          }
          return i;
        }),
      );
    }
  }

  function handleModalToggle(ingredient) {
    if (ingredient) {
      setSelectedIngredient(ingredient);
      addIngredient(ingredient);
    }
    setIsModalOpen(!isModalOpen);
  }

  const modal = (
    <Modal header="Детали ингредиента" onClose={handleModalToggle}>
      <IngredientDetails data={selectedIngredient} />
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
