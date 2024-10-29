import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home />, errorElement: <ErrorPage /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
