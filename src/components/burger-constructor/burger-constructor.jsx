import { useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import {
  ingredientPropType,
  arrayOfIngredientsPropType,
} from '../../utils/prop-schemas';
import {} from '../../utils/data';

function BurgerConstructor({ ingredients, topBun, bottomBun }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalToggle(ingredient) {
    setIsModalOpen(!isModalOpen);
  }

  const modal = (
    <Modal onClose={handleModalToggle}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={styles.section}>
      <div className="mt-25 mb-10 ml-4">
        <span className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={topBun.name}
            price={topBun.price}
            thumbnail={topBun.image}
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
            text={bottomBun.name}
            price={bottomBun.price}
            thumbnail={bottomBun.image}
          />
        </span>
      </div>
      <div className={`${styles.total} mr-5`}>
        <Button type="primary" size="large" onClick={handleModalToggle}>
          Оформить заказ
        </Button>
        <p className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium">{610}&nbsp;</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
      {isModalOpen && modal}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: arrayOfIngredientsPropType.isRequired,
  topBun: ingredientPropType.isRequired,
  bottomBun: ingredientPropType,
};

export default BurgerConstructor;
