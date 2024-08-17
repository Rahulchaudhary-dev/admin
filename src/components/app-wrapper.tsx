import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Outlet } from 'react-router-dom';
import { AppMainWrapperDiv } from '../styles/app-wrapper.styles';
import useGetResponsiveness from '../hooks/useGetResponsiveness';

function AppWrapper() {
  const { isMobile } = useGetResponsiveness();

  return (
    <Suspense fallback={<CircularProgress />}>
      <AppMainWrapperDiv>
        <Outlet />
      </AppMainWrapperDiv>
    </Suspense>
  );
}

export default AppWrapper;
