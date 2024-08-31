import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginData } from '../pages/login/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

const loginFunction = async (data: LoginData) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/admin/login`,
      data
    );
    return response.data;
  } catch (err: any) {
    throw Error(err.response.data.message);
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorage<string | null>('jwtToken', null);

  return useMutation({
    mutationFn: loginFunction,
    onSuccess: async (data) => {
      console.log('Login successful!');

      setToken(data.data);

      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'User logged in successfully',
        })
      );
      navigate('/dashboard');
    },
    onError: (error) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'error',
          message: error.message || 'Error login user',
        })
      );
    },
    onSettled: async () => {
      console.log('Mutation settled.');
    },
  });
};
