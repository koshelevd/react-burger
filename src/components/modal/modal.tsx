import { useEffect, useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { closeModals } from '../../services/slices/modal-slice';
import { IModalProps } from '../../utils/types';

const modalRoot: HTMLDivElement = document.getElementById('react-modals') as HTMLDivElement;

const Modal: FC<IModalProps> = ({ children, header, closeHandler }) => {
  const dispatch = useDispatch();
  const popupClose = useCallback(() => {
    dispatch(closeModals());
  }, [dispatch]);

  const onClose = closeHandler ?? popupClose;

  useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
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
    <ModalOverlay closeHandler={closeHandler}>
      <div className={`${styles.root} pt-10 pr-10 pb-10 pl-10`}>
        {header && (
          <h2 className={`text text_type_main-large ${styles.header}`}>
            {header}
          </h2>
        )}
        <span className={styles.close}>
          <CloseIcon type="primary" onClick={onClose} />
        </span>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}

export default Modal;
