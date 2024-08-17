import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteToast } from '../../redux/toast.slice';

const StatusAlert: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasts.toasts);

  useEffect(() => {
    const handleClose = () => {
      if (toasts.length > 0) {
        dispatch(deleteToast(toasts[0].id));
      }
    };

    if (toasts.length > 0) {
      const timerId = setTimeout(() => {
        handleClose();
      }, toasts[0].ttl || 5000);

      return () => clearTimeout(timerId);
    }
  }, [dispatch, toasts]);

  if (toasts.length === 0 || !toasts[0]?.message) {
    return null;
  }

  return (
    <Snackbar
      open={toasts.length > 0}
      autoHideDuration={toasts[0]?.ttl || 5000}
      onClose={() => dispatch(deleteToast(toasts[0]?.id))}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
      <Alert
        severity={toasts[0]?.type || 'info'}
        onClose={() => dispatch(deleteToast(toasts[0]?.id))}>
        {toasts[0]?.message}
      </Alert>
    </Snackbar>
  );
};

export default StatusAlert;
