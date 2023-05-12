import Layout from './Layout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserAPI } from '../../services/userAPI';
import setUserData from '../../utils/user/setUserData';
import DataResolver from './DataResolver';
import AppContext from '../../context/AppContext';
import { useEffect, useState } from 'react';
import createOrderValidation from '../../utils/validators/createOrderValidation';
import getUserData from '../../utils/user/getUserData';
import { OrderApi } from '../../services/orderAPI';
import setToken from '../../utils/user/setToken';
import { useNavigate } from 'react-router-dom';
import checkResponseError from '../../utils/checkRespoonseError';
//  "homepage": "https://andre4meister.github.io/online-store/",

const LayoutProvider = () => {
  let id;
  const parsedUserData = getUserData();
  if (parsedUserData) {
    id = parsedUserData.id;
  }

  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user', { id }],
    // enabled: !!id,
    enabled: false,
    initialData: () => {
      return null;
    },
    onSuccess: (data) => {
      setUserData(data, true);
    },
    onError: (error) => {
      UserAPI.logout();
    },
    queryFn: async () => {
      console.log('queryFn refetch');
      const response = await UserAPI.getUserById(id);
      checkResponseError(response);
      const data = response.data;
      return data;
    },
  });

  const login = useMutation({
    mutationKey: ['login'],
    onSuccess: (data) => {
      setUserData(data.userData, true);
      setToken(data.token);
      setIsLoginOpen(false);
      navigate('/');
      setAlert({ type: 'success', message: 'Ви успішно авторизувались' });
    },
    mutationFn: async (values) => {
      const response = await UserAPI.login(values);
      checkResponseError(response);
      const userData = response.data;
      return userData;
    },
  });

  const logout = () => {
    UserAPI.logout();
  };

  const addItemToCart = useMutation({
    mutationKey: ['addItemToCart'],
    onSuccess: (data) => {
      setAlert({ type: 'success', message: 'Товар успішно додано до кошика' });
      refetch(['user', { id }]);
    },
    onError: (error) => {
      setAlert({ type: 'error', message: 'Помилка при додаванні товару до кошика' });
    },
    mutationFn: async (id) => {
      if (!id) {
        setAlert({ type: 'error', message: 'Неправильний id товару' });
        return;
      }

      const userData = getUserData();
      if (!userData) {
        setAlert({ type: 'error', message: 'Ви не авторизовані' });
        return;
      }

      const response = await UserAPI.addItemToUserCart({ userId: userData.id, itemId: id });
      checkResponseError(response);
      return response.data;
    },
  });

  const removeItemFromCart = useMutation({
    mutationKey: ['removeItemFromCart'],
    onSuccess: (data) => {
      setAlert({ type: 'success', message: 'Товар успішно видалено з кошика' });
      refetch(['user', { id }]);
    },
    mutationFn: async (id) => {
      if (!id) {
        setAlert({ type: 'error', message: 'Неправильний id товару' });
        return;
      }

      const userData = getUserData();
      if (!userData) {
        setAlert({ type: 'error', message: 'Ви не авторизовані' });
        return;
      }
      const response = await UserAPI.deleteItemFromUserCart({ userId: userData.id, itemId: id });
      checkResponseError(response);
      return response.data;
    },
  });

  const createOrder = useMutation({
    mutationKey: ['createOrder'],
    onSuccess: (data) => {
      setAlert({ type: 'success', message: 'Заказ був успішно створений!' });
      refetch(['user', { id }]);
    },
    mutationFn: async (orderBody) => {
      try {
        createOrderValidation(orderBody);
        const response = await OrderApi.createOrder(orderBody);
        checkResponseError(response);
        return response.data;
      } catch (e) {
        setAlert({ type: 'error', message: e.message });
        return;
      }
    },
  });

  const contextValue = {
    user: data,
    error,
    isLoading,
    isAuth: JSON.parse(localStorage.getItem('isAuth')),
    token: localStorage.getItem('token'),
    isLoginOpen,
    isCartOpen,
    isMenuOpen,
    actions: {
      addItemToCart,
      removeItemFromCart,
      createOrder,
      setAlert,
      setIsCartOpen,
      setIsLoginOpen,
      setIsMenuOpen,
      login,
      logout,
    },
  };

  useEffect(() => {
    if (id) {
      refetch(['user', { id }]);
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <DataResolver data={data} error={error} loading={isLoading}>
          <Layout />
        </DataResolver>
      </AppContext.Provider>
      {alert && (
        <div role="alert" onClick={() => setAlert(null)}>
          {alert.message}
        </div>
      )}
    </>
  );
};

export default LayoutProvider;
