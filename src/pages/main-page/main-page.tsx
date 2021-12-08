import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import styles from './main-page.module.css';

const MainPage: FC = () => {
  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default MainPage;
