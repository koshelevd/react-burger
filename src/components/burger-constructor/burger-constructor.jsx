import React from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ ingredients }) {
  const top = {
    ...ingredients[0],
    name: 'Краторная булка N-200i (Верх)',
  };
  const bottom = {
    ...ingredients[0],
    name: 'Краторная булка N-200i (Низ)',
  };
  return (
    <section className={styles.section}>
      <div className="mt-25 mb-10 ml-4">
        <span className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={top.name}
            price={top.price}
            thumbnail={top.image}
          />
        </span>
        <ul className={`${styles.scrollArea} mt-4 mb-4`}>
          {ingredients.slice(1).map((item) => (
            <li key={item._id} className={`mb-4 ${styles.element}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
        <span className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bottom.name}
            price={bottom.price}
            thumbnail={bottom.image}
          />
        </span>
      </div>
      <div className={`${styles.total} mr-5`}>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
        <p className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium">{610}&nbsp;</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
}

export default BurgerConstructor;
