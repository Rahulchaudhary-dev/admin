import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useLocalStorage from '../hooks/useLocalStorage';

interface Partner {
  id: string;
  name: string;
}

const getPartnerDetails = async (
  token: string,
  PartnerId: string
): Promise<Partner[]> => {
  try {
    const response = await axios.get<Partner[]>(
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
  Partner[],
  Error,
  string
> => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage<string>('jwtToken', '');

  const options: UseMutationOptions<Partner[], Error, string> = {
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
