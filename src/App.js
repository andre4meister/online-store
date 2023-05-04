import styles from './styles/App.module.scss';
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DashboardProvider from "./pages/Dashboard/DashboardProvider";
import Registration from "./pages/Auth/Registration/Registration";
import Login from "./pages/Auth/Login/Login";
import ItemPageContainer from "./pages/ItemPage/ItemPageContainer";
import LayoutProvider from "./pages/Layout/LayoutProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider, theme} from "antd";
import './styles/fonts.css';
import AboutUs from "./pages/AboutUs/AboutUs";
import Collaboration from "./pages/Collaboration/Collaboration";
import PaymentAndDelivery from "./pages/PaymentAndDelivery/PaymentAndDelivery";
import Contacts from "./pages/Contacts/Contacts";

const queryClient = new QueryClient();

const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<LayoutProvider/>}>
            <Route path="item/:id" element={<ItemPageContainer/>}/>
            {/*<Route path="cart" element={<CartPage />} />*/}
            {/*<Route path="order" element={<OrderPage />} />*/}
            <Route path="registration" element={<Registration/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="about" element={<AboutUs/>}/>
            <Route path="collaboration" element={<Collaboration/>}/>
            <Route path="delivery" element={<PaymentAndDelivery/>}/>
            <Route path="contacts" element={<Contacts/>}/>
            <Route index element={<DashboardProvider/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>,
    ),
);

const App = () => (
    <ConfigProvider
        theme={{
            token: {
                colorTextHeading: 'white',
                colorTextBase: 'black',
                // colorBgBase: 'yellow',
            },
            components: {
                Button: {
                    colorBgBase: 'red',
                    colorPrimary: 'purple',
                },
            },
            typography: {
                fontFamily: 'Manrope, sans-serif',
            },
        }}
    >
        <div id="app">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </div>
    </ConfigProvider>
);

export default App;