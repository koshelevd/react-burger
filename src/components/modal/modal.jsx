import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default class Modal extends React.Component {
  render() {
    const { children, header, onClose } = this.props;

    return ReactDOM.createPortal(
      <ModalOverlay onClose={onClose}>
        <div className={`${styles.root} pt-10 pr-10 pb-10 pl-10`}>
          {header && (
            <h2 className={`text text_type_main-large ${styles.header}`}>
              {header}
            </h2>
          )}
          <span className={styles.close}>
            <CloseIcon onClick={onClose} />
          </span>
          {children}
        </div>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  header: PropTypes.string,
  children: PropTypes.element,
};
