import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignupData, SignupResponse } from './types';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import { useNavigate } from 'react-router-dom';

type Input = SignupData;

const signup = async (data: Input): Promise<SignupResponse> => {
  const response = await axios.post(
    'https://api.escuelajs.co/api/v1/users/',
    data
  );
  return response.data;
};

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      console.log("I'm first!");
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'User is created successfully',
        })
      );
      navigate('/login');
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });
};
