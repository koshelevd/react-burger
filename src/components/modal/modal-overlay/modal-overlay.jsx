import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose, children }) {
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
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default ModalOverlay;
