import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

const getPartnerDetails = async (
  token: string,
  PartnerId: string
): Promise<any> => {
  try {
    const response = await axios.get<any>(
      `http://localhost:3001/admin/partner/${PartnerId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data.list.Product || [];
  } catch (err: any) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const useGetPartnerDetails = (): UseMutationResult<
  any,
  Error,
  string
> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<any, Error, string> = {
    mutationFn: (PartnerId: string) => getPartnerDetails(authToken, PartnerId),
    onSuccess: (data: any) => {
      if (data.success) {
        dispatch(
          addToast({
            id: new Date().getTime(),
            type: 'success',
            message: 'Partner details fetched successfully',
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
