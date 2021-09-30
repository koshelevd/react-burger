import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/ingredients';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

import api from '../../utils/api';
import { REMOVE_COMPOSITION_ITEM } from '../../services/actions/composition';
import { OPEN_ORDER_MODAL } from '../../services/actions';

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, types } = useSelector((state) => ({
    ingredients: state.ingredients.all,
    isLoading: state.ingredients.isRequestProcessing,
    types: state.ingredients.types,
  }));
  const composition = useSelector((state) => state.composition);
  const isModalOpen = useSelector((state) => state.isModalOpen.order);
  const [topBun, setTopBun] = useState(null);
  const [bottomBun, setBottomBun] = useState(null);
  const [orderId, setOrderId] = useState(0);

  const totalPrice = useMemo(
    () =>
      composition.reduce(
        (acc, val) => acc + val.price,
        !!topBun ? topBun.price * 2 : 0,
      ),
    [composition, topBun],
  );

  useEffect(() => {
    const activeBun = ingredients.find(
      (i) => i.type === 'bun' && i.count === 1,
    );
    if (!!activeBun) {
      setTopBun({
        ...activeBun,
        name: activeBun.name + ' (верх)',
      });
      setBottomBun({
        ...activeBun,
        name: activeBun.name + ' (низ)',
      });
    }
  }, [ingredients]);

  function handleModalToggle() {
    dispatch({ type: OPEN_ORDER_MODAL });
  }

  function handleCheckout() {
    const data = composition.map((i) => i._id);
    data.push(topBun._id);
    data.push(bottomBun._id);
    api
      .checkout({ ingredients: data })
      .then((res) => {
        if (res.success) {
          setOrderId(res.order.number);
          handleModalToggle();
        }
      })
      .catch((err) => console.log(err));
  }

  function deleteIngredient(ingredient, index) {
    dispatch({
      type: REMOVE_INGREDIENT,
      ingredient,
    });
    dispatch({
      type: REMOVE_COMPOSITION_ITEM,
      index,
    });
  }

  const modal = (
    <Modal onClose={handleModalToggle}>
      <OrderDetails orderId={orderId} />
    </Modal>
  );

  return (
    <section className={styles.section}>
      <div className="mt-25 mb-10 ml-4">
        <span className="pl-8">
          {topBun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={topBun.name}
              price={topBun.price}
              thumbnail={topBun.image}
            />
          ) : (
            <span>Выберите булку</span>
          )}
        </span>
        <ul className={`${styles.scrollArea} mt-4 mb-4`}>
          {composition.map((item, index) => (
            <li key={item._key} className={`mb-4 ${styles.element}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngredient(item, index)}
              />
            </li>
          ))}
        </ul>
        <span className="pl-8">
          {bottomBun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bottomBun.name}
              price={bottomBun.price}
              thumbnail={bottomBun.image}
            />
          ) : (
            <span>Выберите булку</span>
          )}
        </span>
      </div>
      <div className={`${styles.total} mr-5`}>
        {!!topBun && composition.length > 0 && (
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
