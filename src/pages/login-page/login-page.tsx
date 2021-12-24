import React, { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import authSlice, { signIn } from '../../services/slices/auth-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { TRootState } from '../../services/rootReducer';
import { useAppDispatch } from '../../services/store';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  let location = useLocation();
  const { clearError } = authSlice.actions;
  const { isLoggedIn, error } = useSelector((store: TRootState) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });
  const formInfo = [
    {
      text: 'Вы — новый пользователь?',
      linkTitle: 'Зарегистрироваться',
      linkUrl: '/register',
    },
    {
      text: 'Забыли пароль?',
      linkTitle: 'Восстановить пароль',
      linkUrl: '/forgot-password',
    },
  ];

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, clearError]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch((signIn)(values));
  }

  if (isLoggedIn) return <Navigate to="/" state={{ from: location }} />;

  return (
    <AuthForm
      header="Вход"
      buttonText="Войти"
      formInfo={formInfo}
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
    >
      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          value={values.email}
          name="email"
          error={!!errors.email}
          errorText={errors.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <PasswordInput
          value={values.password}
          name="password"
          onChange={handleChange}
        />
      </div>
    </AuthForm>
  );
}
export default LoginPage;
