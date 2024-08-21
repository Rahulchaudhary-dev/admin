import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorMessage from '../../components/ErrorMessage';
import { useLogin } from '../../hooks/useLogin';
interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { mutate: login } = useLogin();
  const onSubmit = (data: IFormInput) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '200px auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{ color: 'black', fontWeight: 700 }}
      >
        Login
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='Email'
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          error={!!errors.email}
          helperText={<ErrorMessage errors={errors} name='email' />}
          sx={{
            input: { color: 'black' },
            label: { color: 'black' },
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='password'
          label='Password'
          type='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={!!errors.password}
          helperText={<ErrorMessage errors={errors} name='password' />}
          sx={{
            input: { color: 'black' },
            label: { color: 'black' },
          }}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{
            mt: 3,
            mb: 2,
            paddingX: '20px',
            paddingY: '15px',
            borderRadius: '10px',
            backgroundColor: '#A7A9AB',
            color: 'white',
            '&:hover': {
              backgroundColor: 'skyblue',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
