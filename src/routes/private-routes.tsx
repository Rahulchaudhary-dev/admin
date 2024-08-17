// ProtectedRoute.tsx

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
