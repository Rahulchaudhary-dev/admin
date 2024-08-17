import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

export const CustomCircularProgress = styled(CircularProgress)({
  width: 'auto !important',
  height: '100% !important',
  minHeight: '20px',
  minWidth: '20px',
  color: '#171A1D',
});

function CircularCustomLoader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <CustomCircularProgress />
    </div>
  );
}

export default CircularCustomLoader;
