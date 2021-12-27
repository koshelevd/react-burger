import { FC, useEffect } from 'react';
import { FeedList, FeedSummary } from '../../components';
import styles from './feed-page.module.css';
import { useAppDispatch } from '../../services/store';
import { loadFeed, closeFeed } from '../../services/slices/feed-slice';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFeed());
    return () => {
      dispatch(closeFeed());
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <FeedList />
      <FeedSummary />
    </main>
  );
};

export default FeedPage;
