import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

function RequireAuth({ children, redirectTo = '/login' }) {
  const { isLoggedIn } = useSelector((store) => store.auth);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
};

export default RequireAuth;
