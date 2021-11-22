import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { closeModals } from '../../../services/slices/modal-slice';

function ModalOverlay({ children, closeHandler }) {
  const dispatch = useDispatch();
  function handleClose(e) {
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

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeHandler: PropTypes.func,
};

export default ModalOverlay;
