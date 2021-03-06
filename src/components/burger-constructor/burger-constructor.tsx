import React, { useMemo, FC } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './burger-constructor.module.css';
import {
  addCompositionItem,
  selectActiveBun,
} from '../../services/slices/composition-slice';
import { checkout } from '../../services/slices/order-slice';
import { useDrop } from 'react-dnd';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TRootState } from '../../services/rootReducer';

const BurgerConstructor: FC = React.memo(() => {
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      handleDrop(item._id);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const outline = isHover ? '2px dashed lightgreen' : 'none';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ingredients } = useAppSelector((state: TRootState) => ({
    ingredients: state.ingredients.all,
  }));
  const { components, activeBun } = useAppSelector((state: TRootState) => state.composition);
  const { isLoggedIn } = useAppSelector((state: TRootState) => state.auth);
  const isModalOpen = useAppSelector((state: TRootState) => state.isModalOpen.order);

  const totalPrice = useMemo<number>(
    () =>
      components.reduce(
        (acc: number, val: TIngredient) => acc + val.price,
        !!activeBun ? activeBun.price * 2 : 0,
      ),
    [components, activeBun],
  );

  function handleCheckout() {
    if (!isLoggedIn) return navigate('/login');
    const composition = [activeBun, ...components, activeBun];
    const data = composition.map((i) => i?._id);
    dispatch((checkout)({ ingredients: data }));
  }

  function handleDrop(itemId: string) {
    const ingredient = ingredients && ingredients.find((i: TIngredient) => i._id === itemId);
    if (ingredient?.type !== 'bun') dispatch(addCompositionItem(ingredient));
    else dispatch(selectActiveBun(ingredient));
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
              text={`${activeBun.name} (????????)`}
              price={activeBun.price}
              thumbnail={activeBun.image}
            />
          ) : (
            <span>???????????????? ??????????</span>
          )}
        </span>
        <ul className={`${styles.scrollArea} mt-4 mb-4`}>
          {components.map((item: TIngredient, index: number) => (
            <DraggableConstructorElement
              item={item}
              index={index}
              key={item.uuid}
            />
          ))}
        </ul>
        <span className="pl-8">
          {activeBun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${activeBun.name} (??????)`}
              price={activeBun.price}
              thumbnail={activeBun.image}
            />
          ) : (
            <span>???????????????? ??????????</span>
          )}
        </span>
      </div>
      <div className={`${styles.total} mr-5`}>
        {!!activeBun && components.length > 0 && (
          <Button type="primary" size="large" onClick={handleCheckout}>
            ???????????????? ??????????
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
