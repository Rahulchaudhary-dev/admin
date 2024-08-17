import React, { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
  setAuthenticatedUser,
  setLoadingAuthRdx,
} from '../redux/auth/auth.slice';
import FullPageSkeletonLoader from './loaders/skeleton-page-loader';
import { useTranslation } from "react-i18next"

interface AuthProviderWrapperProps {
  children: ReactNode;
}
const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({
  children,
}) => {
  const { ready } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();


  useEffect(() => {
    setLoading(true)
    dispatch(setLoadingAuthRdx({ loading: true }));
    // some auth logic
    dispatch(
      setAuthenticatedUser({

      })
    );
    setLoading(false)
  }, [dispatch]);

  if (loading || !ready) {
    return <FullPageSkeletonLoader />;
  }

  return <>{children}</>;
};

export default AuthProviderWrapper;
