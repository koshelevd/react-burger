import { useLocation, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import { forgotPassword } from '../../services/slices/forgot-password-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { isRequestSucceded, error } = useSelector(
    (store) => store.forgotPassword,
  );
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
  });

  const formInfo = [
    {
      text: 'Вспомнили пароль?',
      linkTitle: 'Войти',
      linkUrl: '/login',
    },
  ];

  function handleSubmit(e) {
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
          required
        />
      </div>
    </AuthForm>
  );
}
export default ForgotPasswordPage;
