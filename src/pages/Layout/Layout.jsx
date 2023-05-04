import {FC, useContext, useEffect, useState} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import styles from './Layout.module.scss';
import {Layout} from "antd";
import AppErrorPage from "../AppErrorPage/AppErrorPage";
import MyHeader from "../../components/MyHeader/MyHeader";
import AppContext from "../../context/AppContext";
import {UserAPI} from "../../services/userAPI";
import Footer from "../../components/Footer/Footer";

const { Header, Content } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const error = false
    // const isLoading = false
    const userData = useContext(AppContext);
    console.log(userData)
    const { user, error, isLoading } = userData;
    console.log(user)
    const isAuth = true;

    console.log(error)
    const errorMessage = error?.message;
    console.log(errorMessage)

    useEffect(() => {
        if (errorMessage === 'expire token' || errorMessage === 'Invalid token') {
            UserAPI.logout();
            if (location.pathname.includes('settings')) {
                navigate('/login', { replace: true });
            }
        }
    }, [errorMessage, location.pathname]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <AppErrorPage appError={error} />;
    }

    if (isAuth === undefined) {
        return <Loader />;
    }

    return (
        <Layout>
            <Layout className={styles.antLayout}>
                <Header className={styles.header}>
                    <MyHeader />
                </Header>
                <Content className={styles.content}>{error ? <AppErrorPage appError={error} /> : <Outlet />}</Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
