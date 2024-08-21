import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginData } from '../pages/login/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';

const loginFunction = async (data: LoginData) => {
  try {
    const response = await axios.post(
      'https://8813-2405-201-580b-884-c879-465c-bf2f-a675.ngrok-free.app/auth/login',
      data
    );
    return response.data;
  } catch (err) {
    throw Error;
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginFunction,
    onSuccess: async () => {
      console.log("I'm first!");
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'User logged in successfully',
        })
      );
      navigate('/');
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });
};
