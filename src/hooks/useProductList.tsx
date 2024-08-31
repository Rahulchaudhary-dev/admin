import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

interface Product {
  id: string;
  name: string;
}

const fetchProductList = async (token: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      'http://localhost:3001/admin/product/list',
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data?.data || [];
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const useProductList = (): UseQueryResult<Product[], Error> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseQueryOptions<Product[], Error> = {
    queryKey: ['productList', authToken],
    queryFn: () => fetchProductList(authToken),
    onSuccess: () => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'Product list fetched successfully',
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'error',
          message: error.message,
        })
      );
    },
    onSettled: () => {
      console.log('Query settled.');
    },
  };

  return useQuery(options);
};
