import React, { FC } from 'react';
import styles from './feed-summary.module.css';

const FeedSummary: FC = React.memo(() => {
  return <section className={styles.section}>
    <article className={styles.topContainer}>
      <div className={styles.column}>
        <h2 className='text text_type_main-medium'>Готовы:</h2>
        <ul className={`${styles.list} mt-6`}>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
          <li className={`${styles.orderNumber} text text_type_digits-default mb-2`}>034533</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h2>В работе:</h2>
        <ul>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
        </ul>
      </div>
    </article>
    <article className={styles.container}>
      <h2>Выполнено за все время:</h2>
      <p>28 752</p>
    </article>
    <article className={styles.container}>
    <h2>Выполнено за сегодня:</h2>
      <p>138</p>
    </article>
  </section>;
});

export default FeedSummary;
