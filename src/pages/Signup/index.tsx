import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorMessage from '../../components/ErrorMessage';
import { useSignup } from './useSignup';
import { SignupData } from './types';

interface IFormInput extends SignupData {
  confirmPassword: string;
  terms: boolean;
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { mutate: signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });
  };

  const password = watch('password', '');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        width: '30%',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Sign Up
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
          id='name'
          label='Name'
          {...register('name', {
            required: 'Name is required',
          })}
          error={!!errors.name}
          helperText={<ErrorMessage errors={errors} name='name' />}
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />
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
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
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
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={<ErrorMessage errors={errors} name='confirmPassword' />}
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='avatar'
          label='Avatar URL'
          {...register('avatar', {
            required: 'Avatar URL is required',
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Enter a valid URL',
            },
          })}
          error={!!errors.avatar}
          helperText={<ErrorMessage errors={errors} name='avatar' />}
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register('terms', {
                required: 'You must accept the terms and conditions',
              })}
              sx={{ color: 'white' }}
            />
          }
          label='I accept the terms and conditions'
          sx={{ color: 'white' }}
        />
        <ErrorMessage errors={errors} name='terms' />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2, backgroundColor: 'grey', color: 'white' }}
          disabled={isPending}
        >
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
