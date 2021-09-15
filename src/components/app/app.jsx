import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';
import { INGREDIENTS_TYPES, BASE_BUN_ID } from '../../utils/data';
import api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [mainBun, setMainBun] = useState({});
  const [topBun, setTopBun] = useState({});
  const [bottomBun, setBottomBun] = useState({});

  useEffect(() => {
    const bun = ingredients.find((i) => i._id === BASE_BUN_ID);
    setMainBun(bun);
  }, [ingredients]);

  useEffect(() => {
    const top = {
      ...mainBun,
      name: 'Краторная булка N-200i (Верх)',
    };
    const bottom = {
      ...mainBun,
      name: 'Краторная булка N-200i (Низ)',
    };
    setTopBun(top);
    setBottomBun(bottom);
  }, [mainBun]);

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

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          types={INGREDIENTS_TYPES}
          ingredients={ingredients}
        />
        <BurgerConstructor
          ingredients={ingredients.filter((i) => i.type !== 'bun')}
          topBun={topBun}
          bottomBun={bottomBun}
        />
      </main>
    </>
  );
}

export default App;
