import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import { INGREDIENTS_TYPES } from '../../utils/data';
import api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [notBuns, setNotBuns] = useState([]);

  useEffect(() => {
    api
      .getIngredients()
      .then((result) => {
        setIngredients(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setNotBuns(ingredients.filter((i) => i.type !== 'bun'));
  }, [ingredients]);

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          types={INGREDIENTS_TYPES}
          ingredients={ingredients}
        />
        <BurgerConstructor ingredients={notBuns} />
      </main>
    </>
  );
}

export default App;
