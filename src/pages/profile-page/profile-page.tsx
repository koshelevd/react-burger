import { FC, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getProfile, patchProfile } from '../../services/slices/auth-slice';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import styles from './profile-page.module.css';
import { TRootState } from '../../services/rootReducer';
import { useAppDispatch } from '../../services/store';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((store: TRootState) => store.auth);
  const { values, handleChange, errors, resetForm } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  function onEditEnd() {
    setIsEditName(false);
    setIsEditEmail(false);
    setIsEditPassword(false);
  }

  function handleCancel(e: FormEvent) {
    e.preventDefault();
    onEditEnd();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch((patchProfile)(values));
    onEditEnd();
  }

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      resetForm({ ...user, password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

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
