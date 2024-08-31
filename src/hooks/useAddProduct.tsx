import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

const addProduct = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/admin/product`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const useAddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  return useMutation({
    mutationFn: (data: any) => addProduct(data, authToken),
    onSuccess: async (data) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'Product added successfully',
        })
      );
      navigate('/product-list');
    },
    onError: (error) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'error',
          message: error.message,
        })
      );
    },
    onSettled: () => {
      console.log('Mutation settled.');
    },
  });
};
