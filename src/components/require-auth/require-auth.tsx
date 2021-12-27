import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router';
import { TRootState } from '../../services/rootReducer';
import { useAppSelector } from '../../services/store';
import { IRequireAuthProps } from '../../utils/types';

const RequireAuth: FC<IRequireAuthProps> = ({ children, redirectTo = '/login' }) => {
  const { isLoggedIn } = useAppSelector((store: TRootState) => store.auth);
  return (isLoggedIn ? children : <Navigate to={redirectTo} />) as ReactElement;
}

export default RequireAuth;
