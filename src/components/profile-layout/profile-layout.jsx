import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../../components';
import styles from './profile-layout.module.css';

function ProfileLayout() {
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
