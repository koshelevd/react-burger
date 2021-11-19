import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import authSlice, { signIn } from '../../services/slices/auth-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function LoginPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { clearError } = authSlice.actions;
  const { isLoggedIn, error } = useSelector((store) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signIn(values));
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
          required
        />
      </div>
      <div className="mb-6">
        <PasswordInput
          placeholder="Пароль"
          value={values.password}
          name="password"
          error={!!errors.password}
          errorText={errors.password}
          onChange={handleChange}
        />
      </div>
    </AuthForm>
  );
}
export default LoginPage;
