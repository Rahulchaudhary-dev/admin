import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Pagination,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { useProductList } from '@hooks/useProductList';

const ProductList = () => {
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const { data: products = [], isLoading: loading } = useProductList();

  // useEffect(() => {
  //   // fetchProducts(page);
  // }, [page]);

  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };

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
                {products?.length &&
                  products.map((product) => (
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
        {/* 
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
        </Box> */}
      </Box>
    </DashboardLayout>
  );
};

export default ProductList;
