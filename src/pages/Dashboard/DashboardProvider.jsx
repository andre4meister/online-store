import {useQuery} from "@tanstack/react-query";
import {ItemApi} from "../../services/itemApi";
import DashboardContext from "../../context/DashboardContext";
import DataResolver from "../Layout/DataResolver";
import Dashboard from "./Dashboard";

const DashboardProvider = ({children}) => {
    const {data, error, isLoading} = useQuery({
        queryKey: ['items'], queryFn: async () => {
            const response = await ItemApi.getItems();
            const items = response.data.rows;
            return items;
        }
    });

    const dataCopy = data ? [...data] : [];
    const discountItem = dataCopy.filter(item => item.discountPrice).sort((a, b) => a.discountPrice - b.discountPrice)[0];
    const newItem = dataCopy.filter(item => item).sort((a, b) =>  new Date().toISOString(a.createdAt) - new Date().toISOString(b.createdAt))[0];
    const collection = dataCopy.slice(0, 6);

    const contextValue = {
        allItems: data,
        discountItem,
        newItem,
        collection,
        error,
        isLoading,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            <DataResolver data={data} error={error} loading={isLoading}>
                <Dashboard />
            </DataResolver>
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;