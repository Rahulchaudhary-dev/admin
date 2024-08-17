import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const FullPageSkeletonLoader = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header (Navbar) Skeleton */}
      <Skeleton variant='rectangular' height={56} />

      {/* Hero Section Skeleton */}
      <Skeleton
        variant='rectangular'
        height={isXSmall ? 150 : 250}
        sx={{ my: 2 }}
      />

      {/* Main Content Area - Video Thumbnails */}
      <Grid container spacing={2} sx={{ px: isXSmall ? 2 : 4 }}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Skeleton variant='rectangular' height={180} />
            <Skeleton />
            <Skeleton width='60%' />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FullPageSkeletonLoader;
