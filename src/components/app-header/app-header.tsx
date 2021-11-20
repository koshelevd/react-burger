import { NavLink, useMatch } from 'react-router-dom';
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  const isMainPage = useMatch('/');
  const isFeedPage = useMatch('/feed');
  const isProfilePage = useMatch('/profile/*');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={`${styles.item} pl-5 pr-5 mr-2`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  styles.link
                } text text_type_main-default text_color_inactive ${
                  isActive && styles.active
                }`
              }
            >
              <span className="mr-2">
                <BurgerIcon type={isMainPage ? 'primary' : 'secondary'} />
              </span>
              <span className={styles.text}>Конструктор</span>
            </NavLink>
          </li>
          <li className={`${styles.item} pl-5 pr-5 mr-2`}>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `${
                  styles.link
                } text text_type_main-default text_color_inactive ${
                  isActive && styles.active
                }`
              }
            >
              <span className="mr-2">
                <ListIcon type={isFeedPage ? 'primary' : 'secondary'} />
              </span>
              <span className={styles.text}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
        <span className={styles.logo}>
          <Logo />
        </span>
        <ul className={`${styles.menu} ${styles.menu_right}`}>
          <li className={`${styles.item} pl-5 pr-5 mr-2`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${
                  styles.link
                } text text_type_main-default text_color_inactive ${
                  isActive && styles.active
                }`
              }
            >
              <span className="mr-2">
                <ProfileIcon type={isProfilePage ? 'primary' : 'secondary'} />
              </span>
              <span className={styles.text}>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
