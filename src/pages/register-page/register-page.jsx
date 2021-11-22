import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import authSlice, { signUp } from '../../services/slices/auth-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function RegisterPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { clearError } = authSlice.actions;
  const { isLoggedIn, error } = useSelector((store) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  const formInfo = [
    {
      text: 'Уже зарегистрированы?',
      linkTitle: 'Войти',
      linkUrl: '/login',
    },
  ];

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, clearError]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUp(values));
  }

  if (isLoggedIn) return <Navigate to="/" state={{ from: location }} />;

  return (
    <AuthForm
      header="Регистрация"
      buttonText="Зарегистрироваться"
      formInfo={formInfo}
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
    >
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          value={values.name}
          name="name"
          error={!!errors.name}
          errorText={errors.name}
          onChange={handleChange}
          required
        />
      </div>
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
export default RegisterPage;
