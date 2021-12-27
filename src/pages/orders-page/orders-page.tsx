import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../../components/feed-list/order-card/order-card';
import { TRootState } from '../../services/rootReducer';
import { loadUserFeed, closeFeed } from '../../services/slices/feed-slice';
import { useAppDispatch } from '../../services/store';
import { TOrder } from '../../utils/types';
import styles from './orders-page.module.css';

const OrdersPage: FC = React.memo(() => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { orders } = useSelector((state: TRootState) => ({
    orders: state.feed.all,
  }));
  const [reversedOrders, setReversedOrders] = useState<Array<TOrder>>([]);

  useEffect(() => {
    dispatch(loadUserFeed());
    return () => {
      dispatch(closeFeed());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      setReversedOrders([...orders].reverse());
    }
  }, [orders]);

  return (
    <section className={styles.section}>
      <ul className={styles.scrollArea}>
        {reversedOrders.map((order) => (
          <li key={order._id} className={styles.item}>
            <Link
              to={`/profile/orders/${order._id}`}
              state={{ backgroundLocation: location }}
              className={styles.link}
            >
              <OrderCard data={order} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default OrdersPage;
