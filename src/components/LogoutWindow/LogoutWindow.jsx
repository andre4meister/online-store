import React, { useContext } from 'react';
import styles from './LogoutWindow.module.scss';
import { Button } from 'antd';
import AppContext from '../../context/AppContext';
import getUserData from '../../utils/user/getUserData';

const LogoutWindow = ({}) => {
  let { user, actions } = useContext(AppContext);
  const handleLogout = () => {
    actions.logout();
  };

  if (!user) {
    user = getUserData() || null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>Ви ввійшли з аккаунту:</p>
        <h3>{user.userName}</h3>
        <h3>{user.email}</h3>
      </div>
      <Button className={styles.logout} onClick={handleLogout}>
        Вийти
      </Button>
    </div>
  );
};

export default LogoutWindow;
