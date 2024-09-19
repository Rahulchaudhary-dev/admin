import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppWrapper from '../components/app-wrapper';
import ErrorBoundary from '../components/error-boundry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import StatusAlert from '../components/toast';
import AuthProviderWrapper from '../components/auth-provider';
import ProtectedRoute from '../routes/private-routes';
import Login from './login';
import ProductList from './productList';
import AddProduct from './addProduct';
import UserList from './userList';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const publicRoute = [
    {
      path: '/',
      element: <Login />,
      id: 'home',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/login',
      element: <Login />,
      id: 'login',
      errorElement: <ErrorBoundary />,
    },
  ];

  const privateRoute = [
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      ),
      id: 'dashboard',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/product-list',
      element: (
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      ),
      id: 'ProductList',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/add-product',
      element: (
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      ),
      id: 'AddProduct',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/user-list',
      element: (
        <ProtectedRoute>
          <UserList />
        </ProtectedRoute>
      ),
      id: 'UserList',
      errorElement: <ErrorBoundary />,
    },
  ];

  const Root = () => {
    return <AppWrapper />;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [...publicRoute, ...privateRoute],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderWrapper>
        <CssBaseline enableColorScheme>
          <RouterProvider router={router} />
        </CssBaseline>
        <ReactQueryDevtools />
        <StatusAlert />
      </AuthProviderWrapper>
    </QueryClientProvider>
  );
};

export default App;
