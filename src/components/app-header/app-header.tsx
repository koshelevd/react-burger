import React from 'react';
import styles from './app-header.module.css';
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={`${styles.item} pl-5 pr-5 mr-2`}>
            <span className="mr-2">
              <BurgerIcon type="primary" />
            </span>
            <span className="text text_type_main-default">Конструктор</span>
          </li>
          <li className={`${styles.item} pl-5 pr-5`}>
            <span className="mr-2">
              <ListIcon type="secondary" />
            </span>
            <span className="text text_type_main-default text_color_inactive">
              Лента заказов
            </span>
          </li>
        </ul>
        <span className={styles.logo}>
          <Logo />
        </span>
        <ul className={`${styles.menu} ${styles.menu_right}`}>
          <li className={`${styles.item} pl-5 pr-5`}>
            <span className="mr-2">
              <ProfileIcon type="secondary" />
            </span>
            <span className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
