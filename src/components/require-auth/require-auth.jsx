import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function RequireAuth({ children, redirectTo='/login' }) {
  const { isLoggedIn } = useSelector((store) => store.auth);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
