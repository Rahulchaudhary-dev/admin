import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

const changeStatus = async (
  token: string,
  data: {
    user_id: string;
    status: number;
  }
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/admin/user/status`,
      { ...data },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data || [];
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const useChangeStatus = (): UseMutationResult<any, Error, string> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<any, Error, string> = {
    mutationFn: (data: any) => changeStatus(authToken, data),
    onSuccess: (data: any) => {
      if (data.success) {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'success',
            message: 'status updated successfully',
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
