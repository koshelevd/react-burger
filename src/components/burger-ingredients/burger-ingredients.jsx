import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';
import {
  arrayOfTypesPropType,
  arrayOfIngredientsPropType,
} from '../../utils/prop-schemas';

function BurgerIngredients({ types, ingredients }) {
  const [currentTab, setCurrentTab] = React.useState(types[0].slug);
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
                  <li key={i._id}>
                    <IngredientCard data={i} quantity={1} />
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  types: arrayOfTypesPropType.isRequired,
  ingredients: arrayOfIngredientsPropType.isRequired,
};

export default BurgerIngredients;
