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
  CircularProgress,
  Drawer,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DashboardLayout } from '@components/layout';
import { useGetUserList } from '@hooks/useGetUserList';
import CloseIcon from '@mui/icons-material/Close';
import CircularCustomLoader from '@components/loaders/circular-custom-loader';
import { useGetUserDetails } from '@hooks/useGetUserDetails';
import { useChangeStatus } from '@hooks/useChangeStatus';

const UserList = () => {
  const { data: users = [], isLoading: loading } = useGetUserList();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userStatus, setUserStatus] = useState('');

  const {
    mutate: getUserDetails,
    data: userDetailsresponse,
    isPending: userDetailsLoading,
  } = useGetUserDetails();

  const { mutate: updateUserStatus, isPending: statusUpdateLoading } =
    useChangeStatus();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = (user: any) => {
    setSelectedUserId(user.id);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    if (selectedUserId) {
      getUserDetails(selectedUserId);
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (userDetailsresponse && userDetailsresponse.length) {
      setUserStatus(userDetailsresponse[0].account_status);
    }
  }, [userDetailsresponse]);

  const handleStatusChange = (event: any) => {
    const newStatus = event.target.value;
    console.log('newStatus', newStatus);
    setUserStatus(newStatus);
    if (selectedUserId) {
      updateUserStatus({ user_id: selectedUserId, status: newStatus });
    }
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
              <TableHead sx={{ backgroundColor: '#353535' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>S.No</TableCell>
                  <TableCell sx={{ color: 'white' }}>Address</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.list?.length &&
                  users?.list.map((user, index) => (
                    <TableRow
                      key={user.id}
                      hover
                      onClick={() => handleRowClick(user)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        {user.account_status === 1 ? 'Active' : 'De-Active'}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            {userDetailsLoading ? (
              <CircularCustomLoader />
            ) : (
              <>
                {userDetailsresponse?.length && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0 30px',
                        alignItems: 'center',
                        mb: 4,
                        gap: '50px',
                      }}
                    >
                      <Typography
                        variant='h2'
                        sx={{ fontSize: '14px', fontWeight: '700' }}
                      >
                        {userDetailsresponse[0].address}
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2, width: '200px' }}>
                        <InputLabel id='status-select-label'>Status</InputLabel>
                        <Select
                          labelId='status-select-label'
                          id='status-select'
                          value={userStatus}
                          label='Status'
                          onChange={handleStatusChange}
                          disabled={statusUpdateLoading}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={0}>De-Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

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
                                Product Name
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white', textAlign: 'center' }}
                              >
                                Tasks Completed
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white', textAlign: 'center' }}
                              >
                                Total Tasks
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white', textAlign: 'center' }}
                              >
                                Tokens Earned
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: 'white', textAlign: 'center' }}
                              >
                                Total Tokens
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userDetailsresponse[0].UserTasks.map(
                            (task, index) => (
                              <TableRow key={index}>
                                <TableCell>{task.Product.name}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.task_completed}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.Product.total_tasks}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.tokens_earned}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                  {task.Product.total_token}
                                </TableCell>
                              </TableRow>
                            )
                          )}
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

export default UserList;
