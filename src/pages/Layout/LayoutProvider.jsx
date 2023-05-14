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
import checkResponseError from '../../utils/checkRespoonseError';
import { Alert } from 'antd';
import RegisterModal from '../../components/RegisterModal/RegisterModal';

const LayoutProvider = () => {
  let id;
  const parsedUserData = getUserData();
  if (parsedUserData) {
    id = parsedUserData.id;
  }

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
      refetch(['user', { id: data.userData.id }]);
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
      setAlert({ type: 'error', message: error.toString() || 'Помилка при додаванні товару до кошика' });
    },
    mutationFn: async (id) => {
      if (!id) {
        setAlert({ type: 'error', message: 'Неправильний id товару' });
        return;
      }

      const userData = getUserData();
      if (userData === null) {
        throw new Error('Ви повині бути авторизовані для додавання товарів у кошик');
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
        throw new Error('Ви повинні бути авторизовані для видалення товарів з корзини');
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
      const userData = getUserData();
      if (!userData) {
        throw new Error('Ви повинні бути авторизовані для створення замовлення');
      }
      createOrderValidation(orderBody);
      const response = await OrderApi.createOrder(orderBody);
      checkResponseError(response);

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
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  useEffect(() => {
    if (id) {
      refetch(['user', { id }]);
    }
  }, []);

  useEffect(() => {
    let timeoutId = null;

    if (alert) {
      timeoutId = setTimeout(() => {
        setAlert(null);
      }, 7000);
    } else {
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alert]);

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <DataResolver data={data} error={error} loading={isLoading}>
          <Layout />
        </DataResolver>
      </AppContext.Provider>
      {alert && (
        <div style={{ position: 'fixed', top: '100px', left: '20px', maxWidth: '300px' }}>
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
