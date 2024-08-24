import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  if (!authToken) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
