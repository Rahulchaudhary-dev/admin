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
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { usePartnersList } from '@hooks/usePartnersList';
import CloseIcon from '@mui/icons-material/Close';
import CircularCustomLoader from '@components/loaders/circular-custom-loader';
import { useGetPartnerDetails } from '@hooks/useGetPartnersDetails';

const PartnersList = () => {
  const { data: partners = [], isLoading: loading } = usePartnersList();
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const {
    mutate: getPartnerDetails,
    data: partnerDetailsResponse,
    isPending: partnerDetailsLoading,
  } = useGetPartnerDetails();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = (partner) => {
    setSelectedPartnerId(partner.id);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedPartnerId(null);
  };

  useEffect(() => {
    if (selectedPartnerId) {
      getPartnerDetails(selectedPartnerId);
    }
  }, [selectedPartnerId, getPartnerDetails]);

  // Safely extract the list from the response
  const partnersList = partnerDetailsResponse?.data?.list || [];

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom>
          Partners List
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!partners.length ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <Typography variant='h6'>No data Found</Typography>
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
                    {partners.map((partner, index) => (
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
                {partnersList.length > 0 ? (
                  partnersList.map((partner, userIndex) => (
                    <Box key={partner.id} sx={{ mb: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        {partner.Product.ProductImages.length > 0 && (
                          <Avatar
                            src={partner.Product.ProductImages[0].file_path}
                            alt={partner.Product.name}
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                        )}
                        <Typography variant='h6' sx={{ fontWeight: 700 }}>
                          {partner.email}
                        </Typography>
                      </Box>

                      <Typography variant='body1' sx={{ mb: 1 }}>
                        <strong>Mobile No:</strong> {partner.mobile_no}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant='h6'
                          color='textSecondary'
                          sx={{ fontWeight: 700 }}
                        >
                          Product Details
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Name:</strong> {partner.Product.name}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Max Supply:</strong>{' '}
                          {partner.Product.max_supply}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Max User:</strong> {partner.Product.max_user}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Total Tasks:</strong>{' '}
                          {partner.Product.total_tasks}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Total Token User:</strong>{' '}
                          {partner.Product.total_token_user}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 4 }}>
                        <Typography
                          variant='h6'
                          color='textSecondary'
                          sx={{ fontWeight: 700 }}
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
                                    {task.status === 1
                                      ? 'Completed'
                                      : 'Pending'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
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
