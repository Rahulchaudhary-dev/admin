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
  } catch (err) {
    console.log(err);
    throw Error('Login failed');
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>('jwtToken', null);

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
    onSettled: async () => {
      console.log('Mutation settled.');
    },
  });
};
