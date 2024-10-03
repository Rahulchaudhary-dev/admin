import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { useProductList } from '@hooks/useProductList';
import CloseIcon from '@mui/icons-material/Close';
import { useGetProductDetails } from '@hooks/useGetProductDetails';
import CircularCustomLoader from '@components/loaders/circular-custom-loader';

const ProductList = () => {
  const { data: products = [], isLoading: loading } = useProductList();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    mutate: getProductDetails,
    data: productDetailsresponse,
    isPending: productDetailsLoading,
  } = useGetProductDetails();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = (product: any) => {
    setSelectedProductId(product.id || 'asdfasdfasdf');
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProductId(null);
  };

  useEffect(() => {
    if (selectedProductId) return getProductDetails(selectedProductId);
    return;
  }, [selectedProductId]);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom>
          Product List
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!loading && !products?.length ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                No data Found
              </div>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  width: '100%',
                  mx: 'auto',
                  mt: 3,
                }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: '#353535' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white' }}>Image</TableCell>
                      <TableCell sx={{ color: 'white' }}>Name</TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        Total Tokens
                      </TableCell>
                      <TableCell sx={{ color: 'white' }}>Total Tasks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.length > 0 &&
                      products.map((product) => (
                        <TableRow
                          key={product.id}
                          hover
                          onClick={() => handleRowClick(product)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell>
                            <Avatar
                              alt={product.name}
                              src={product.ProductImages[0]?.file_url}
                              variant='rounded'
                              sx={{ width: 56, height: 56 }}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.total_token}</TableCell>
                          <TableCell>{product.total_tasks}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        <Drawer
          anchor='right'
          open={drawerOpen}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: { width: 500 },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                Product Details
              </Typography>
              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            {productDetailsLoading ? (
              <CircularCustomLoader />
            ) : (
              <>
                {productDetailsresponse && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: '0 auto',
                        alignItems: 'center',
                        mb: 4,
                      }}
                    >
                      <Avatar
                        alt={productDetailsresponse.name}
                        src={productDetailsresponse.ProductImages[0]?.file_path}
                        variant='rounded'
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography variant='h5' sx={{ fontWeight: '700' }}>
                        {productDetailsresponse.name}
                      </Typography>
                    </Box>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-start',
                        gap: '40px',
                      }}
                    >
                      <Typography variant='body2' color='textSecondary'>
                        <span style={{ fontWeight: 700 }}>Total Tokens:</span>
                        {productDetailsresponse.total_token}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        <span style={{ fontWeight: 700 }}>Total Tasks:</span>
                        {productDetailsresponse.total_tasks}
                      </Typography>
                    </div>

                    <Typography
                      variant='h6'
                      color='textSecondary'
                      sx={{ mt: 4, mb: 2, fontWeight: 700 }}
                    >
                      Tasks
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead sx={{ backgroundColor: '#353535' }}>
                          <TableRow>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white' }}
                              >
                                Task Name
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white', textAlign: 'center' }}
                              >
                                Token Amount
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white' }}
                              >
                                Status
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productDetailsresponse.Tasks.map((task, index) => (
                            <TableRow key={index}>
                              <TableCell>{task.task_name}</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>
                                {task.token_amount}
                              </TableCell>
                              <TableCell>
                                {task.status === 1 ? 'Active' : 'Inactive'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </DashboardLayout>
  );
};

export default ProductList;
