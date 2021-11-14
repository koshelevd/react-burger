import React from 'react';
import styles from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Profile</h1>
      </form>
    </div>
  );
}
export default ProfilePage;
