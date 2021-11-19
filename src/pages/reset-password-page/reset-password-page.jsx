import { useLocation, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthForm } from '../../components';
import { resetPassword } from '../../services/slices/reset-password-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { FULFILLED_FORGOT_REQUEST_KEY } from '../../utils/constants';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { isRequestSucceded, error, responseError } = useSelector(
    (store) => store.resetPassword,
  );
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const isFulfilled = localStorage.getItem(FULFILLED_FORGOT_REQUEST_KEY);

  const formInfo = [
    {
      text: 'Вспомнили пароль?',
      linkTitle: 'Войти',
      linkUrl: '/login',
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPassword({ ...values }));
  }

  if (!isFulfilled)
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  if (isLoggedIn || isRequestSucceded)
    return <Navigate to="/login" state={{ from: location }} />;

  return (
    <AuthForm
      header="Восстановление пароля"
      buttonText="Сохранить"
      formInfo={formInfo}
      onSubmit={handleSubmit}
      isValid={isValid}
      error={responseError ?? error}
    >
      <div className="mb-6">
        <PasswordInput
          placeholder="Введите новый пароль"
          value={values.password}
          name="password"
          error={!!errors.password}
          errorText={errors.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder="Введите код из письма"
          value={values.token}
          name="token"
          error={!!errors.token}
          errorText={errors.token}
          onChange={handleChange}
        />
      </div>
    </AuthForm>
  );
}
export default ResetPasswordPage;
