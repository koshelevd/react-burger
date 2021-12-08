import { FC } from 'react';
import styles from './not-found-page.module.css';

const NotFoundPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Page not found</h1>
    </main>
  );
};

export default NotFoundPage;
