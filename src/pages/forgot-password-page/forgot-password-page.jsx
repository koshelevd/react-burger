import React from 'react';
import styles from './forgot-password-page.module.css';

function ForgotPasswordPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Забыл пароль</h1>
      </form>
    </div>
  );
}
export default ForgotPasswordPage;
