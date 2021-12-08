import { FC, FormEvent } from 'react';
import { useLocation, Navigate } from 'react-router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import { forgotPassword } from '../../services/slices/forgot-password-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { TFormInfo } from '../../utils/types';

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  
  let location = useLocation();
  const { isRequestSucceded, error } = useSelector(
    (store: RootStateOrAny) => store.forgotPassword,
  );
  const { isLoggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
  });

  const formInfo: Array<TFormInfo> = [
    {
      text: 'Вспомнили пароль?',
      linkTitle: 'Войти',
      linkUrl: '/login',
    },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch((forgotPassword as any)({ email: values.email }));
  }

  if (isLoggedIn) return <Navigate to="/login" state={{ from: location }} />;
  if (isRequestSucceded)
    return <Navigate to="/reset-password" state={{ from: location }} />;

  return (
    <AuthForm
      header="Восстановление пароля"
      buttonText="Восстановить"
      formInfo={formInfo}
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
    >
      <div className="mb-6">
        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={values.email}
          name="email"
          error={!!errors.email}
          errorText={errors.email}
          onChange={handleChange}
        />
      </div>
    </AuthForm>
  );
}
export default ForgotPasswordPage;
