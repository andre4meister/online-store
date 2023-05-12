import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import DashboardProvider from './pages/Dashboard/DashboardProvider';
import ItemPageProvider from './pages/ItemPage/ItemPageProvider';
import LayoutProvider from './pages/Layout/LayoutProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import './styles/fonts.css';
import AboutUs from './pages/AboutUs/AboutUs';
import Collaboration from './pages/Collaboration/Collaboration';
import PaymentAndDelivery from './pages/PaymentAndDelivery/PaymentAndDelivery';
import Contacts from './pages/Contacts/Contacts';

const queryClient = new QueryClient();

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutProvider />}>
      <Route path="item/:id" element={<ItemPageProvider />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="collaboration" element={<Collaboration />} />
      <Route path="delivery" element={<PaymentAndDelivery />} />
      <Route path="contacts" element={<Contacts />} />
      <Route index element={<DashboardProvider />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App = () => (
  <ConfigProvider>
    <div id="app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  </ConfigProvider>
);

export default App;
