import React from 'react';
import styles from './reset-password-page.module.css';

function ResetPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Сбросить пароль</h1>
      </form>
    </div>
  );
}
export default ResetPasswordPage;
