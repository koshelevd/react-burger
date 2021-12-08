import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../services/slices/auth-slice';
import styles from './profile-navigation.module.css';
import { FC, MouseEventHandler } from 'react';

const ProfileNavigation: FC = () => {
  const isProfilePage = useMatch('/profile');
  const isOrdersPage = useMatch('/profile/orders');
  const navigate = useNavigate();
  const linkStyle: string = `${styles.link} text text_type_main-medium text_color_inactive`;

  const dispatch = useDispatch();
  const logout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(signOut());
    return navigate('/login');
  };

  return (
    <nav>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/profile"
            className={`${linkStyle} ${isProfilePage && styles.active}`}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            className={`${linkStyle} ${isOrdersPage && styles.active}`}
          >
            История
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={logout}
            className={({ isActive }) =>
              `${styles.link} text text_type_main-medium text_color_inactive ${
                isActive && styles.active
              }`
            }
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p className="text text_type_main-small text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}
export default ProfileNavigation;
