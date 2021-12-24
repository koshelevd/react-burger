import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { TRootState } from '../../services/rootReducer';
import { IRequireAuthProps } from '../../utils/types';

const RequireAuth: FC<IRequireAuthProps> = ({ children, redirectTo = '/login' }) => {
  const { isLoggedIn } = useSelector((store: TRootState) => store.auth);
  return (isLoggedIn ? children : <Navigate to={redirectTo} />) as ReactElement;
}

export default RequireAuth;
