import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  total_tasks: yup
    .number()
    .required('Total tasks are required')
    .positive('Total tasks must be a positive number'),
  total_token: yup
    .number()
    .required('Total tokens are required')
    .positive('Total tokens must be a positive number'),
  auction_time: yup
    .date()
    .required('Auction time is required')
    .typeError('Invalid date format (use YYYY/MM/DD)'),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageId, setImageId] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);

      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { data } = response;
      if (data && data.image_id) {
        setImageId(data.image_id);
        alert('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageId) {
      alert('Please upload an image before submitting.');
      return;
    }

    const formData = {
      ...data,
      image_id: imageId,
    };

    try {
      const response = await axios.post('/api/products', formData);
      if (response.status === 200) {
        alert('Product added successfully');
        reset();
        setImageId('');
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: '50%',
          boxShadow: 'none',
        }}
      >
        <Typography variant='h4' gutterBottom>
          Add Product
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Product Name'
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ''}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Total Tasks'
                fullWidth
                type='number'
                {...register('total_tasks')}
                error={!!errors.total_tasks}
                helperText={
                  errors.total_tasks ? String(errors.total_tasks.message) : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Total Tokens'
                fullWidth
                type='number'
                {...register('total_token')}
                error={!!errors.total_token}
                helperText={
                  errors.total_token ? String(errors.total_token.message) : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle1' gutterBottom>
                Upload Product Image
              </Typography>
              <Button
                variant='contained'
                component='label'
                sx={{
                  backgroundColor: '#87CEEB',
                  '&:hover': {
                    backgroundColor: '#00BFFF',
                  },
                }}
                disabled={uploading}
              >
                {uploading ? <CircularProgress size={24} /> : 'Upload Image'}
                <input
                  type='file'
                  hidden
                  onChange={handleImageUpload}
                  accept='image/*'
                />
              </Button>

              {imagePreview && (
                <Box mt={2}>
                  <Typography variant='subtitle2' gutterBottom>
                    Image Preview:
                  </Typography>
                  <Avatar
                    alt='Product Image'
                    src={imagePreview}
                    variant='rounded'
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
              )}

              {/* Show uploaded image ID */}
              {imageId && (
                <Typography variant='body2' color='success.main' mt={1}>
                  Image uploaded successfully. Image ID: {imageId}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Auction Time'
                fullWidth
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('auction_time')}
                error={!!errors.auction_time}
                helperText={
                  errors.auction_time ? String(errors.auction_time.message) : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: '#87CEEB',
                  '&:hover': {
                    backgroundColor: '#00BFFF',
                  },
                  width: '100%',
                }}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </DashboardLayout>
  );
};

export default AddProduct;
