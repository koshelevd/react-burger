import React from 'react';
import styles from './not-found-page.module.css';

function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>404</h1>
      </form>
    </div>
  );
}

export default NotFoundPage;
