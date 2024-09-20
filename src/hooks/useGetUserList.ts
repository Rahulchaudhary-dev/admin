import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

interface user {
  id: string;
  address: string;
  account_status: number;
}

const fetchUserList = async (token: string): Promise<user[]> => {
  try {
    const response = await axios.get<user[]>(
      'http://localhost:3001/admin/users/list',
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

export const useGetUserList = (): UseQueryResult<user[], Error> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseQueryOptions<user[], Error> = {
    queryKey: ['userList'],
    queryFn: () => fetchUserList(authToken),
    onSuccess: () => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'user list fetched successfully',
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
