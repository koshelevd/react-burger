import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { closeModals } from '../../services/slices/modal-slice';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, closeHandler }) {
  const dispatch = useDispatch();
  const popupClose = useCallback(() => {
    dispatch(closeModals());
  }, [dispatch]);

  const onClose = closeHandler ?? popupClose;

  useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay>
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
    modalRoot,
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Modal;
