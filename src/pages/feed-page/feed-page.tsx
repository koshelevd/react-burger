import { FC } from 'react';
import { FeedList, FeedSummary } from '../../components';
import styles from './feed-page.module.css';

const FeedPage: FC = () => {
  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <FeedList />
      <FeedSummary />
    </main>
  );
};

export default FeedPage;
