import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import api from '../../utils/api';
import { IngredientsContext } from '../../contexts/ingredients-context';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    api
      .getIngredients()
      .then((result) => {
        setIngredients(result.data);
      })
      .catch((err) => console.log(err));
  }, [setIngredients]);

  return (
    <IngredientsContext.Provider value={[ingredients, setIngredients]}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </IngredientsContext.Provider>
  );
}

export default App;
