import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { CLOSE_MODAL } from '../../../services/actions';

function ModalOverlay({ children }) {
  const dispatch = useDispatch();
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      dispatch({ type: CLOSE_MODAL });
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
};

export default ModalOverlay;
