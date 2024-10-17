import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import useLocalStorage from '@hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const pageTitles = {
  '/product-list': 'Product List',
  '/add-product': 'Add Product',
  '/user-list': 'User List',
  '/partner-list': 'Partner List',
  '/logout': 'Logout',
};

export const DashboardLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authToken, setToken] = useLocalStorage<string>('jwtToken', '');

  const handleLogout = () => {
    setToken('');
    navigate('/');
  };

  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#353535',
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap>
            {currentPageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#353535',
            color: 'white',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to='/product-list'>
              <ListItemIcon>
                <ListIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Product List' />
            </ListItem>
            <ListItem button component={Link} to='/add-product'>
              <ListItemIcon>
                <AddIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Add Product' />
            </ListItem>
            <ListItem button component={Link} to='/user-list'>
              <ListItemIcon>
                <ListIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='User List' />
            </ListItem>
            <ListItem button component={Link} to='/partner-list'>
              <ListItemIcon>
                <ListIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Partner List' />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <div style={{ height: '100vh' }}>{children}</div>
      </Box>
    </Box>
  );
};
