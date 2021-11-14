import React from 'react';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';

function LoginPage() {
  return (
    <main className={`${styles.main}`}>
      <h1 className={`${styles.heading} text text_type_main-medium pb-6`}>
        Вход
      </h1>
      <form className={`${styles.form} mb-20`}>
        <div className="mb-6">
          <EmailInput />
        </div>
        <div className="mb-6">
          <PasswordInput />
        </div>
        <Button>Войти</Button>
      </form>

      <p
        className={`${styles.info} text text_type_main-default text_color_inactive mb-4`}
      >
        Вы — новый пользователь?{' '}
        <Link to="/register" className="link">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive mb-4`}
      >
        Забыли пароль?{' '}
        <Link to="/forgot-password" className="link">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
}
export default LoginPage;
