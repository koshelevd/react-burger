import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose, children }) {
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={styles.root} onClick={handleClose}>
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
