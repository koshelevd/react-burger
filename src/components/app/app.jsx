import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import { INGREDIENTS_TYPES } from '../../utils/data';
import api from '../../utils/api';
import { IngredientsContext } from '../../contexts/ingredients-context';

function App() {
  console.log('App render');
  const ingredientsState = useState({
    all: [],
    buns: [],
    types: INGREDIENTS_TYPES,
  });
  const [ingredients, setIngredients] = ingredientsState;
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    api
      .getIngredients()
      .then((result) => {
        setRawData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIngredients({
      ...ingredients,
      all: rawData,
      buns: [], // rawData.filter((i) => i.type !== 'bun'),
    });
  }, [rawData, ingredients]);

  return (
    <IngredientsContext.Provider value={ingredientsState}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        {/* <BurgerConstructor /> */}
      </main>
    </IngredientsContext.Provider>
  );
}

export default App;
