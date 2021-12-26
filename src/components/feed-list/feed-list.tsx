import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from './order-card/order-card';
import styles from './feed-list.module.css';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/rootReducer';

const FeedList: FC = React.memo(() => {
  const location = useLocation();
  const { orders } = useSelector((state: TRootState) => ({
    orders: state.feed.all,
  }));

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <ul className={styles.scrollArea}>
        {orders.map((order) => (
          <li key={order._id} className={styles.item}>
            <Link
              to={`/feed/${order._id}`}
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

export default FeedList;
