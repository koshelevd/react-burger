import React, { useContext, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';
import {
  arrayOfTypesPropType,
  arrayOfIngredientsPropType,
} from '../../utils/prop-schemas';
import { IngredientsContext } from '../../contexts/ingredients-context';

const BurgerIngredients = React.memo(() => {
  const [ingredients] = useContext(IngredientsContext);
  console.log('BurgerIngredients render');
  const [currentTab, setCurrentTab] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  function handleModalToggle(ingredient) {
    if (ingredient) {
      setSelectedIngredient(ingredient);
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
        {ingredients.types.map((type) => (
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
        {ingredients.types.map((type, index) => (
          <article key={index} className={`mt-10 ${styles.ingredients}`}>
            <h2 className="text text_type_main-medium mb-6">{type.title}</h2>
            <ul className={`${styles.cards} pl-4`}>
              {ingredients.all
                .filter((i) => i.type === type.slug)
                .map((i) => (
                  <li key={i._id} onClick={() => handleModalToggle(i)}>
                    <IngredientCard data={i} quantity={1} />
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

BurgerIngredients.propTypes = {
  types: arrayOfTypesPropType.isRequired,
  ingredients: arrayOfIngredientsPropType.isRequired,
};

export default BurgerIngredients;
