import { FC, FormEvent } from 'react';
import { useLocation, Navigate } from 'react-router';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import { forgotPassword } from '../../services/slices/forgot-password-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { TFormInfo } from '../../utils/types';
import { TRootState } from '../../services/rootReducer';
import { useAppDispatch, useAppSelector } from '../../services/store';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();

  let location = useLocation();
  const { isRequestSucceded, error } = useAppSelector(
    (store: TRootState) => store.forgotPassword,
  );
  const { isLoggedIn } = useAppSelector((store: TRootState) => store.auth);
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
    dispatch(forgotPassword({ email: values.email }));
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
};
export default ForgotPasswordPage;
