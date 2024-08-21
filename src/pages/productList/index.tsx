import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      setTimeout(() => {
        const dummyResponse = {
          statusCode: 200,
          message: 'Request Done Successfully',
          totalItems: 5,
          pageSize: 2,
          data: [
            {
              name: 'Wazirx',
              total_token: 120,
              total_tasks: 10,
              image_id: '5164f9f2-7d27-4223-a83c-8604273c8ab2',
              ProductImages: [
                {
                  id: '5164f9f2-7d27-4223-a83c-8604273c8ab2',
                  file_url: 'https://via.placeholder.com/150',
                },
              ],
            },
            {
              name: 'Coinbase',
              total_token: 200,
              total_tasks: 15,
              image_id: '1164f9f2-7d27-4223-a83c-8604273c8ab3',
              ProductImages: [
                {
                  id: '1164f9f2-7d27-4223-a83c-8604273c8ab3',
                  file_url: 'https://via.placeholder.com/150',
                },
              ],
            },
          ],
        };

        if (dummyResponse.statusCode === 200) {
          setProducts(dummyResponse.data);
          setTotalPages(
            Math.ceil(dummyResponse.totalItems / dummyResponse.pageSize)
          );
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              mx: 'auto',
              mt: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Total Tokens</TableCell>
                  <TableCell>Total Tasks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.name}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
            sx={{
              button: {
                backgroundColor: '#87CEEB',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#00BFFF',
                },
              },
            }}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default ProductList;
