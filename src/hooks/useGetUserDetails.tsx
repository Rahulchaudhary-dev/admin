import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

interface user {
  id: string;
  address: string;
  account_status: number;
  UserTasks: any;
}

const getUserDetails = async (
  token: string,
  userId: string
): Promise<user[]> => {
  try {
    const response = await axios.get<user[]>(
      `http://localhost:3001/admin/user/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data || [];
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const useGetUserDetails = (): UseMutationResult<
  user[],
  Error,
  string
> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<user[], Error, string> = {
    mutationFn: (productId: string) => getUserDetails(authToken, productId),
    onSuccess: (data: any) => {
      if (data.success) {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'success',
            message: 'user details fetched successfully',
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
