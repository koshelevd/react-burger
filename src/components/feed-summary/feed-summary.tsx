import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/rootReducer';
import styles from './feed-summary.module.css';

const FeedSummary: FC = React.memo(() => {
  const { orders, total, totalToday } = useSelector((state: TRootState) => ({
    orders: state.feed.all,
    total: state.feed.total,
    totalToday: state.feed.totalToday,
  }));

  return (
    <section className={styles.section}>
      <article className={styles.topContainer}>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <ul className={`${styles.list} mt-6`}>
            {orders
              .filter((orders) => orders.status === 'done')
              .map((order) => (
                <li
                  key={order._id}
                  className={`${styles.orderDone} text text_type_digits-default mb-2`}
                >
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <ul className={`${styles.list} mt-6`}>
            {orders
              .filter((orders) => orders.status === 'pending')
              .map((order) => (
                <li
                  key={order._id}
                  className={`${styles.orderPending} text text_type_digits-default mb-2`}
                >
                  {order.number}
                </li>
              ))}
          </ul>
        </div>
      </article>
      <article className="mt-9">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={`${styles.order} text text_type_digits-large`}>{total}</p>
      </article>
      <article className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={`${styles.order} text text_type_digits-large`}>
          {totalToday}
        </p>
      </article>
    </section>
  );
});

export default FeedSummary;
