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
import { Alert } from 'antd';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
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
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCloseAlert = () => {
    setAlert(null);
  };

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
      const response = await UserAPI.getUserById(id);
      checkResponseError(response);
      return response.data;
    },
  });

  const login = useMutation({
    mutationKey: ['login'],
    onSuccess: (data) => {
      setUserData(data.userData, true);
      setToken(data.token);
      setIsLoginOpen(false);
      setAlert({ type: 'success', message: 'Ви успішно авторизувались' });
    },
    onError: (error) => {
      const errorMessage = error.toString();
      setAlert({ type: 'error', message: errorMessage });
    },
    mutationFn: async (values) => {
      const response = await UserAPI.login(values);
      checkResponseError(response);
      return response.data;
    },
  });

  const logout = () => {
    UserAPI.logout();
  };

  const register = useMutation({
    mutationKey: ['registration'],
    onSuccess: () => {
      setIsLoginOpen(false);
      setShowRegisterModal(false);
    },
    onError: (error) => {
      const errorMessage = error.toString();
      setAlert({ type: 'error', message: errorMessage });
    },
    mutationFn: async (values) => {
      const response = await UserAPI.register(values);
      checkResponseError(response);
      if (response.status === 201) {
        login.mutate({ email: values.email, password: values.password });
      }
      return response.data;
    },
  });

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
    onError: (error) => {
      const errorMessage = error.toString();
      setAlert({ type: 'error', message: errorMessage });
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
    onError: (error) => {
      const errorMessage = error.toString();
      setAlert({ type: 'error', message: errorMessage });
    },
    mutationFn: async (orderBody) => {
      console.log(orderBody, 'orderBody');
      createOrderValidation(orderBody);
      const response = await OrderApi.createOrder(orderBody);
      checkResponseError(response);

      // if (response.status === 201) {
      //   console.log(orderBody.items, 'orderBody.items');
      //   await Promise.all(
      //     orderBody.items.forEach((item) => {
      //       removeItemFromCart.mutate(item.itemId);
      //     }),
      //   );
      // }

      return response.data;
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
    showRegisterModal,
    actions: {
      addItemToCart,
      removeItemFromCart,
      createOrder,
      setAlert,
      setIsCartOpen,
      setIsLoginOpen,
      setIsMenuOpen,
      setShowRegisterModal,
      login,
      logout,
      register,
    },
  };

  useEffect(() => {
    if (id) {
      refetch(['user', { id }]);
    }
  }, []);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 7000);
    }
  }, [alert]);
  return (
    <>
      <AppContext.Provider value={contextValue}>
        <DataResolver data={data} error={error} loading={isLoading}>
          <Layout />
        </DataResolver>
      </AppContext.Provider>
      {alert && (
        <div style={{ position: 'fixed', top: '100px', left: '20px' }}>
          <Alert message={alert.message} type={alert.type} closable showIcon afterClose={handleCloseAlert} />
        </div>
      )}
      {showRegisterModal && (
        <RegisterModal
          register={register}
          setShowRegisterModal={setShowRegisterModal}
          showRegisterModal={showRegisterModal}
        />
      )}
    </>
  );
};

export default LayoutProvider;
