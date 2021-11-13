import React from 'react';
import styles from './register-page.module.css';

function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Регистрация</h1>
      </form>
    </div>
  );
}
export default RegisterPage;
