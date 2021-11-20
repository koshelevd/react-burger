import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getProfile, patchProfile } from '../../services/slices/auth-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import styles from './profile-page.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { values, handleChange, errors, resetForm } = useFormWithValidation();

  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  function onEditEnd() {
    // resetForm(user);
    setIsEditName(false);
    setIsEditEmail(false);
    setIsEditPassword(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    onEditEnd();
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(patchProfile(values));
    onEditEnd();
  }

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      resetForm(user);
    }
  }, [user, dispatch, resetForm]);

  return (
    <form className={styles.form}>
      <div className="mb-6">
        <Input
          placeholder="Имя"
          icon="EditIcon"
          value={values.name}
          name="name"
          error={!!errors.name}
          errorText={errors.name}
          onChange={handleChange}
          onIconClick={() => setIsEditName(!isEditName)}
          disabled={!isEditName}
        />
      </div>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="Логин"
          icon="EditIcon"
          value={values.email}
          name="email"
          error={!!errors.email}
          errorText={errors.email}
          onChange={handleChange}
          onIconClick={() => setIsEditEmail(!isEditEmail)}
          disabled={!isEditEmail}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder="Пароль"
          icon="EditIcon"
          value={values.password}
          name="password"
          error={!!errors.password}
          errorText={errors.password}
          onChange={handleChange}
          onIconClick={() => setIsEditPassword(!isEditPassword)}
          disabled={!isEditPassword}
        />
      </div>
      {(isEditName || isEditEmail || isEditPassword) && (
        <div className={styles.buttons}>
          <Button onClick={handleSubmit}>Сохранить</Button>
          <Button onClick={handleCancel} type="secondary">
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
}
export default ProfilePage;
