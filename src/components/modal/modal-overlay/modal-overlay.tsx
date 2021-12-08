import { FC, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import styles from './modal-overlay.module.css';
import { closeModals } from '../../../services/slices/modal-slice';
import { IModalOverlayProps } from '../../../utils/types';

const ModalOverlay:FC<IModalOverlayProps> = ({ children, closeHandler }) => {
  const dispatch = useDispatch();
  const handleClose: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) {
      !!closeHandler ? closeHandler() : dispatch(closeModals());
    }
  }

  return (
    <section className={styles.root} onClick={handleClose}>
      {children}
    </section>
  );
}

export default ModalOverlay;
