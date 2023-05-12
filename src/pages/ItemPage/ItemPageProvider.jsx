import ItemPage from './ItemPage';
import { useQuery } from '@tanstack/react-query';
import { ItemApi } from '../../services/itemApi';
import { useParams } from 'react-router-dom';
import DataResolver from '../Layout/DataResolver';
import { useEffect } from 'react';

const ItemPageProvider = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['item', { id }],
    enabled: false,
    queryFn: async () => {
      if (id) {
        const response = await ItemApi.getItemById(id);
        return response.data;
      }
    },
  });

  useEffect(() => {
    refetch(['item', { id }]);
  }, [id]);

  return (
    <DataResolver data={data} error={error} loading={isLoading}>
      <ItemPage item={data} />
    </DataResolver>
  );
};

export default ItemPageProvider;
