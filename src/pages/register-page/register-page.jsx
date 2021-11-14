import React from 'react';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';

function RegisterPage() {
  return (
    <main className={`${styles.main}`}>
      <h1 className={`${styles.heading} text text_type_main-medium pb-6`}>
        Регистрация
      </h1>
      <form className={`${styles.form} mb-20`}>
        <div className="mb-6">
          <Input placeholder="Имя" />
        </div>
        <div className="mb-6">
          <EmailInput />
        </div>
        <div className="mb-6">
          <PasswordInput />
        </div>
        <Button>Зарегистрироваться</Button>
      </form>

      <p
        className={`${styles.info} text text_type_main-default text_color_inactive mb-4`}
      >
        Уже зарегистрированы?{' '}
        <Link to="/login" className="link">
          Войти
        </Link>
      </p>
    </main>
  );
}
export default RegisterPage;
