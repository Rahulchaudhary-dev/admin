import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';

interface ErrorMessageProps {
  errors: FieldErrors<FieldValues>;
  name: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  const error = errors[name];
  return error ? (
    <Typography variant='body2' color='error'>
      {error.message?.toString()}
    </Typography>
  ) : null;
};

export default ErrorMessage;
