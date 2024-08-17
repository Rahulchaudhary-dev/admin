import { Theme, useMediaQuery, useTheme } from '@mui/material';

function useGetResponsiveness() {
  const theme: Theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isTab = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLowResDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isHighResDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return { isMobile, isTab, isLowResDesktop, isHighResDesktop };
}

export default useGetResponsiveness;
