import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './burger-constructor.module.css';
import { ADD_INGREDIENT } from '../../services/actions/ingredients';
import {
  addCompositionItem,
  SELECT_ACTIVE_BUN,
} from '../../services/actions/composition';
import { checkout } from '../../services/actions/order';
import { useDrop } from 'react-dnd';

const BurgerConstructor = React.memo(() => {
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      handleDrop(item._id);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const outline = isHover ? '2px dashed lightgreen' : 'none';
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => ({
    ingredients: state.ingredients.all,
  }));
  const { components, activeBun } = useSelector((state) => state.composition);
  const composition = useSelector((state) => state.composition);
  const isModalOpen = useSelector((state) => state.isModalOpen.order);

  const totalPrice = useMemo(
    () =>
      composition.components.reduce(
        (acc, val) => acc + val.price,
        !!composition.activeBun ? composition.activeBun.price * 2 : 0,
      ),
    [composition],
  );

  function handleCheckout() {
    const compose = [activeBun, ...components, activeBun];
    const data = compose.map((i) => i._id);
    dispatch(checkout({ ingredients: data }));
  }

  function handleDrop(itemId) {
    const ingredient = ingredients.find((i) => i._id === itemId);
    dispatch({
      type: ADD_INGREDIENT,
      ingredient,
    });

    if (ingredient.type !== 'bun') dispatch(addCompositionItem(ingredient));
    else
      dispatch({
        type: SELECT_ACTIVE_BUN,
        ingredient,
      });
  }

  const modal = (
    <Modal>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={styles.section}>
      <div className="mt-25 mb-10 ml-4" ref={dropTarget} style={{ outline }}>
        <span className="pl-8">
          {activeBun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${activeBun.name} (верх)`}
              price={activeBun.price}
              thumbnail={activeBun.image}
            />
          ) : (
            <span>Выберите булку</span>
          )}
        </span>
        <ul className={`${styles.scrollArea} mt-4 mb-4`}>
          {components.map((item, index) => (
            <DraggableConstructorElement
              item={item}
              index={index}
              key={item.uuid}
              id={item.uuid}
            />
          ))}
        </ul>
        <span className="pl-8">
          {activeBun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${activeBun.name} (низ)`}
              price={activeBun.price}
              thumbnail={activeBun.image}
            />
          ) : (
            <span>Выберите булку</span>
          )}
        </span>
      </div>
      <div className={`${styles.total} mr-5`}>
        {!!activeBun && components.length > 0 && (
          <Button type="primary" size="large" onClick={handleCheckout}>
            Оформить заказ
          </Button>
        )}
        <p className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium">
            {totalPrice}&nbsp;
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
      {isModalOpen && modal}
    </section>
  );
});

export default BurgerConstructor;
