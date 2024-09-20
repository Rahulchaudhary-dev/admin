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

// Map of route paths to dynamic headings
const pageTitles = {
  '/product-list': 'Product List',
  '/add-product': 'Add Product',
  '/logout': 'Logout',
};

// Dashboard Layout Component that accepts children
export const DashboardLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authToken, setToken] = useLocalStorage<string>('jwtToken', '');

  const handleLogout = () => {
    setToken('');
    navigate('/');
  };

  // Get the dynamic title based on the current route, default to "Dashboard"
  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top App Bar with dynamic title */}
      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#353535', // Silver background color for AppBar
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
            color: 'white', // Silver background color for Sidebar
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
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content where children components will be rendered */}
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
