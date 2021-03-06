import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-form.module.css';
import { IAuthFormProps } from '../../utils/types';

const AuthForm: FC<IAuthFormProps> = ({
  header,
  children,
  buttonText,
  formInfo,
  onSubmit,
  isValid,
  error,
}) => {
  return (
    <main className={`${styles.main}`}>
      <h1 className={`${styles.heading} text text_type_main-medium pb-6`}>
        {header}
      </h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        {!!error && <p>{error}</p>}
        {children}
        <Button disabled={!isValid}>{buttonText}</Button>
      </form>

      {formInfo &&
        formInfo.map((data, idx) => (
          <p
            key={idx}
            className={`${styles.info} text text_type_main-default text_color_inactive mb-4`}
          >
            {data.text}{' '}
            <Link to={data.linkUrl} className="link">
              {data.linkTitle}
            </Link>
          </p>
        ))}
    </main>
  );
}

export default AuthForm;
