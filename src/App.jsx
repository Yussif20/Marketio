import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorPage from './pages/ErrorPage';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, errorElement: <ErrorPage /> },
      { path: '/contact', element: <Contact /> },
    ],
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
