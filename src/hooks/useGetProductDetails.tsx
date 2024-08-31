import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

interface Product {
  id: string;
  name: string;
}

const getProductDetails = async (
  token: string,
  productId: string
): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `http://localhost:3001/admin/product/${productId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data.getProduct || [];
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const useGetProductDetails = (): UseMutationResult<
  Product[],
  Error,
  string
> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<Product[], Error, string> = {
    mutationFn: (productId: string) => getProductDetails(authToken, productId),
    onSuccess: (data: any) => {
      if (data.success) {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'success',
            message: 'Product details fetched successfully',
          })
        );
      } else {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'error',
            message: data.message,
          })
        );
      }
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
  };

  return useMutation(options);
};
