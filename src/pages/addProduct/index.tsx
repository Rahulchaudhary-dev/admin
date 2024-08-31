import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
  IconButton,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { useAddProduct } from '@hooks/useAddProduct';
import { useUploadImage } from '@hooks/useUploadImage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
  tasks: yup.array().of(
    yup.object().shape({
      task_name: yup.string().required('Task name is required'),
      token_amount: yup
        .number()
        .required('Token amount is required')
        .positive('Token amount must be a positive number'),
      status: yup.number().required('Status is required').oneOf([1, 0]),
    })
  ),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: addProduct } = useAddProduct();

  const {
    mutate: uploadImage,
    data: imageUploadResponse,
    isPending: uploadingImage,
  } = useUploadImage();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    uploadImage(file);
  };
  console.log('imageUploadResponse', imageUploadResponse);

  const onSubmit = async (data: any) => {
    const finalData = {
      ...data,
      image_id: imageUploadResponse?.id,
    };
    addProduct(finalData);
  };

  return (
    <DashboardLayout>
      <Typography variant='h4' gutterBottom>
        Add New Product
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          gap: 10,
          boxShadow: 'none',
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, mb: 4, width: '70%' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Product Name'
                fullWidth
                variant='outlined'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name ? String(errors.name.message) : ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='Total Tasks'
                fullWidth
                type='number'
                variant='outlined'
                {...register('total_tasks')}
                error={!!errors.total_tasks}
                helperText={
                  errors.total_tasks ? String(errors.total_tasks.message) : ''
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='Total Tokens'
                fullWidth
                type='number'
                variant='outlined'
                {...register('total_token')}
                error={!!errors.total_token}
                helperText={
                  errors.total_token ? String(errors.total_token.message) : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Auction Time'
                fullWidth
                type='date'
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('auction_time')}
                error={!!errors.auction_time}
                helperText={
                  errors.auction_time
                    ? String(errors.auction_time.message)
                    : 'Format: YYYY/MM/DD'
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Tasks
              </Typography>
              {fields.map((task, index) => (
                <Box key={task.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label='Task Name'
                    fullWidth
                    variant='outlined'
                    {...register(`tasks.${index}.task_name`)}
                    error={!!errors.tasks?.[index]?.task_name}
                    helperText={
                      errors.tasks?.[index]?.task_name
                        ? String(errors.tasks[index]?.task_name?.message)
                        : ''
                    }
                  />
                  <TextField
                    label='Token Amount'
                    fullWidth
                    type='number'
                    variant='outlined'
                    {...register(`tasks.${index}.token_amount`)}
                    error={!!errors.tasks?.[index]?.token_amount}
                    helperText={
                      errors.tasks?.[index]?.token_amount
                        ? String(errors.tasks[index]?.token_amount?.message)
                        : ''
                    }
                  />
                  <TextField
                    label='Status'
                    fullWidth
                    type='number'
                    variant='outlined'
                    {...register(`tasks.${index}.status`)}
                    error={!!errors.tasks?.[index]?.status}
                    helperText={
                      errors.tasks?.[index]?.status
                        ? String(errors.tasks[index]?.status?.message)
                        : ''
                    }
                  />
                  <IconButton onClick={() => remove(index)} color='error'>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant='outlined'
                onClick={() =>
                  append({ task_name: '', token_amount: '', status: 1 })
                }
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  borderColor: '#0288d1',
                  color: '#0288d1',
                  '&:hover': {
                    borderColor: '#0277bd',
                    color: '#0277bd',
                  },
                }}
              >
                Add Task
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: '#0288d1',
                  '&:hover': {
                    backgroundColor: '#0277bd',
                  },
                  width: '100%',
                  py: 1.5,
                }}
              >
                Submit Product
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid item lg={12}>
          <Typography variant='subtitle1' gutterBottom>
            Upload Product Image
          </Typography>
          <Button
            variant='contained'
            component='label'
            sx={{
              backgroundColor: '#0288d1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0277bd',
              },
              mb: 2,
            }}
            disabled={uploadingImage}
          >
            {uploadingImage ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              'Choose Image'
            )}
            <input
              type='file'
              hidden
              onChange={handleImageUpload}
              accept='image/*'
            />
          </Button>

          {imagePreview && (
            <Box mt={2}>
              <Avatar
                alt='Product Image'
                src={imagePreview}
                variant='rounded'
                sx={{ width: 100, height: 100 }}
              />
            </Box>
          )}
        </Grid>
      </Paper>
    </DashboardLayout>
  );
};

export default AddProduct;
