import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';

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
              {console.log(ingredients.filter((i) => i.type === type.slug))}
              {ingredients
                .filter((i) => i.type === type.slug)
                .map((i) => (
                  <li key={i.name}>
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

export default BurgerIngredients;
