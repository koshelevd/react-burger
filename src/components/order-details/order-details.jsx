import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import doneIcon from '../../assets/images/done.png';

function OrderDetails() {
  const orderId = useSelector((state) => state.order.info.number)
  return (
    <article className={`${styles.root}`}>
      <p className={`${styles.order} text text_type_digits-large mt-20 mb-8`}>
        {orderId}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneIcon} alt="Иконка 'Готово'" className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
}

export default OrderDetails;
