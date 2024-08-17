import { useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';

function SkeletonCardLoader() {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTab = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLowResLap = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const cardCount = isMobile ? 1 : isTab ? 2 : isLowResLap ? 3 : 4;
  const cardWidth = isMobile ? '100%' : 280;

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{ padding: theme.spacing(2) }}>
      {Array.from(new Array(cardCount)).map((_, index) => (
        <Box
          key={`${index}-skeleton`}
          sx={{ width: cardWidth, margin: theme.spacing(1) }}>
          <Skeleton
            variant='rectangular'
            sx={{ width: '100%', height: 180, bgcolor: 'grey.300' }}
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton sx={{ bgcolor: 'grey.300' }} />
            <Skeleton sx={{ width: '60%', bgcolor: 'grey.300' }} />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default SkeletonCardLoader;
