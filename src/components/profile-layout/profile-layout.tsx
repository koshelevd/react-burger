import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '..';
import styles from './profile-layout.module.css';

const ProfileLayout: FC = () => {
  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <ProfileNavigation />
      </aside>
      <Outlet />
    </main>
  );
}

export default ProfileLayout;
