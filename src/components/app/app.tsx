import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import { INGREDIENTS_DATA, INGREDIENTS_TYPES } from '../../utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          types={INGREDIENTS_TYPES}
          ingredients={INGREDIENTS_DATA}
        />
        <BurgerConstructor ingredients={INGREDIENTS_DATA} />
      </main>
    </>
  );
}

export default App;
