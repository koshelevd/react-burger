import { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router';
import styles from './order-info.module.css';
import { TOrder, TIngredientCount } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderItem } from '..';
import { TRootState } from '../../services/rootReducer';
import formatDate from '../../utils/date';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { loadFeed, closeFeed } from '../../services/slices/feed-slice';
import getStatus from '../../utils/status';

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orders, allIngredients } = useAppSelector((state: TRootState) => ({
    orders: state.feed.all,
    allIngredients: state.ingredients.all,
  }));
  const [data, setData] = useState<TOrder | null>(null);
  const [ingredients, setIngredients] =
    useState<Array<TIngredientCount> | null>(null);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(loadFeed());
      return () => {
        dispatch(closeFeed());
      };
    }
  }, [dispatch, orders]);

  useEffect(() => {
    const selectedOrder: TOrder | undefined = orders?.find(
      (i: TOrder) => i._id === id,
    );

    if (!data && selectedOrder) {
      setData(selectedOrder);
      const ingredientsArray: Array<TIngredientCount> = [];
      selectedOrder.ingredients.forEach((id) => {
        const i = allIngredients?.find((i) => i._id === id);
        if (i) ingredientsArray.push({ ...i, count: 1 });
      });

      const price = ingredientsArray.reduce(
        (acc: number, val: any) => acc + val?.price,
        0,
      );
      setPrice(price);

      const ingredientsCount: Array<TIngredientCount> = [];
      ingredientsArray.forEach((ingredient) => {
        const finded = ingredientsCount.find((i) => i._id === ingredient._id);
        if (finded) {
          if (finded.count) finded.count += 1;
        } else {
          ingredientsCount.push(ingredient);
        }
      });

      setIngredients(ingredientsCount);
    }
  }, [orders, data, id, allIngredients]);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <article className={styles.root}>
        <p className="text text_type_digits-default">#0{data?.number}</p>
        <h2 className={`${styles.name} text text_type_main-medium mt-10 mb-3`}>
          {data?.name}
        </h2>
        <p className={`${styles.status} text text_type_main-default`}>
          {getStatus(data?.status)}
        </p>
        <p className={`${styles.name} text text_type_main-medium mt-15 mb-6`}>
          Состав:
        </p>
        <ul className={styles.scrollArea}>
          {ingredients?.map((i, index) => (
            <li key={index}>{<OrderItem data={i} key={i._id} />}</li>
          ))}
        </ul>
        <div className={`${styles.bottom} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(data?.createdAt)}
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default text_color_primary mr-2">
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </article>
    </main>
  );
};

export default OrderInfo;
