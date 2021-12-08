import { FC, ReactElement } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { IRequireAuthProps } from '../../utils/types';

const RequireAuth: FC<IRequireAuthProps> = ({ children, redirectTo = '/login' }) => {
  const { isLoggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  return (isLoggedIn ? children : <Navigate to={redirectTo} />) as ReactElement;
}

export default RequireAuth;
