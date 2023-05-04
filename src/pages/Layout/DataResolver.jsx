import React from 'react';
import Loader from "../../components/Loader/Loader";
import AppErrorPage from "../AppErrorPage/AppErrorPage";

const DataResolver = ({data, error, loading, children}) => {
    if (loading) {
        return <Loader />
    }

    if (error) {
        return <AppErrorPage appError={error}/>
    }

    return (
        <>
            {typeof children === 'function' ? children(data) : children}
        </>
    );
};

export default DataResolver;