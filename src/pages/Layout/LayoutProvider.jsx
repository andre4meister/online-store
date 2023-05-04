import React from 'react';
import Layout from "./Layout";
import {useQuery} from "@tanstack/react-query";
import {UserAPI} from "../../services/userAPI";
import setUserData from "../../utils/user/setUserData";
import DataResolver from "./DataResolver";
import AppContext from "../../context/AppContext";

const LayoutProvider = () => {

    let id = "1af57fc683664b7f";
    // const parsedUserData = JSON.parse(localStorage.getItem('userData') || null);
    // if (parsedUserData) {
    //     id = parsedUserData.id;
    // }

    const {data, error, isLoading} = useQuery({ queryKey: ['user'], queryFn: async () => {
        if (id) {
            const response = await UserAPI.getUserById(id);
            const userData = response.data;

            setUserData(userData, true);
            return userData;
        } else {
            return UserAPI.logout()
        }
    }});

    const contextValue = {
        user: data,
        error,
        isLoading,
        isAuth: localStorage.getItem('isAuth'),
        token: localStorage.getItem('token'),
    };

    return (
        <AppContext.Provider value={contextValue}>
            <DataResolver data={data} error={error} loading={isLoading}>
                <Layout />
            </DataResolver>
        </AppContext.Provider>
    );
};

export default LayoutProvider;
