import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

type ChangeStatusData = {
  user_id: string;
  status: number;
};

const changeStatus = async (token: string, data: ChangeStatusData) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/admin/product/status`,
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
    throw new Error(err.response?.data?.message || 'Failed to update status');
  }
};

export const useChangeProductStatus = (): UseMutationResult<
  any,
  Error,
  ChangeStatusData
> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<any, Error, ChangeStatusData> = {
    mutationFn: (data: ChangeStatusData) => changeStatus(authToken, data),
    onSuccess: (data: any) => {
      if (data.statusCode === 200) {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'success',
            message: 'Status updated successfully',
          })
        );
      } else {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'error',
            message: data.message || 'Failed to update status',
          })
        );
      }
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
      console.log('Mutation settled.');
    },
  };

  return useMutation(options);
};
