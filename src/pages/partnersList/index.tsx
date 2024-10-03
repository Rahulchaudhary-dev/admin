import { useEffect, useState } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { usePartnersList } from '@hooks/usePartnersList';
import CloseIcon from '@mui/icons-material/Close';
import CircularCustomLoader from '@components/loaders/circular-custom-loader';
import { useGetPartnerDetails } from '@hooks/useGetPartnersDetails';

const PartnersList = () => {
  const { data: partners = [], isLoading: loading } = usePartnersList();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    mutate: getPartnerDetails,
    data: partnerDetailsresponse,
    isPending: partnerDetailsLoading,
  } = useGetPartnerDetails();

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
    if (selectedProductId) return getPartnerDetails(selectedProductId);
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
            {!loading && !partners?.length ? (
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
                      <TableCell sx={{ color: 'white' }}>S.No</TableCell>
                      <TableCell sx={{ color: 'white' }}>Email</TableCell>
                      <TableCell sx={{ color: 'white' }}>
                        Mobile Number
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {partners?.length > 0 &&
                      partners.map((partner, index) => (
                        <TableRow
                          key={partner.id}
                          hover
                          onClick={() => handleRowClick(partner)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{partner.email}</TableCell>
                          <TableCell>{partner.mobile_no}</TableCell>
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
            sx: { width: '60%' },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                User Details
              </Typography>
              <IconButton onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            {partnerDetailsLoading ? (
              <CircularCustomLoader />
            ) : (
              <>
                {partnerDetailsresponse?.list?.length > 0 ? (
                  partnerDetailsresponse?.list.map((partner, userIndex) => (
                    <Box key={userIndex} sx={{ mb: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          margin: '0 30px',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant='h2'
                          sx={{ fontSize: '14px', fontWeight: '700' }}
                        >
                          {partner.email}
                        </Typography>
                      </Box>

                      <Typography variant='body1' sx={{ mb: 2 }}>
                        Mobile No: {partner.mobile_no}
                      </Typography>

                      <Typography
                        variant='h6'
                        color='textSecondary'
                        sx={{ mt: 4, mb: 2, fontWeight: 700 }}
                      >
                        Product: {partner.Product.name}
                      </Typography>

                      <Typography
                        variant='h6'
                        color='textSecondary'
                        sx={{ mt: 4, mb: 2, fontWeight: 700 }}
                      >
                        Tasks
                      </Typography>
                      <TableContainer component={Paper} sx={{ mb: 2 }}>
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
                                  sx={{ color: 'white', textAlign: 'center' }}
                                >
                                  Status
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {partner.Product.Tasks.map((task, taskIndex) => (
                              <TableRow key={taskIndex}>
                                <TableCell>{task.task_name}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.token_amount}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.status === 1 ? 'Completed' : 'Pending'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))
                ) : (
                  <Typography variant='body1' color='textSecondary'>
                    No users found.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </DashboardLayout>
  );
};

export default PartnersList;
