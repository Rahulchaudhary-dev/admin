import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';

const uploadImage = async (file: File, authToken: string) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      'http://localhost:3001/admin/product/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: authToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export const useUploadImage = () => {
  const [authToken] = useLocalStorage<string>('jwtToken', '');
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (file: File) => uploadImage(file, authToken),
    onSuccess: (data) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'Image uploaded successfully',
        })
      );
    },
    onError: (error) => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'error',
          message: 'Failed to uploaded product image',
        })
      );
    },
  });
};
