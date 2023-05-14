import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import styles from './MyHeader.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import CartWindow from '../CartWindow/CartWindow';
import LoginWindow from '../LoginWindow/LoginWindow';
import Sidebar from '../Sidebar/Sidebar';
import AppContext from '../../context/AppContext';

const MyHeader = ({}) => {
  const navigate = useNavigate();

  const { actions, isLoginOpen, isCartOpen, isMenuOpen } = useContext(AppContext);
  const { setIsLoginOpen, setIsCartOpen, setIsMenuOpen } = actions;

  const handleLoginClick = (event) => {
    event.stopPropagation();
    setIsLoginOpen((prev) => !prev);
    setIsCartOpen(false);
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
    setIsCartOpen((prev) => !prev);
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const cartOrLoginWindow = document.querySelector(`.${styles.cartOrLoginWindow}`);

      if (cartOrLoginWindow && !cartOrLoginWindow.contains(event.target)) {
        setIsCartOpen(false);
        setIsLoginOpen(false);
      }
    };

    if (isLoginOpen || isCartOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLoginOpen, isCartOpen, setIsCartOpen, setIsLoginOpen]);

  return (
    <div className={styles.headerContainer}>
      {isMenuOpen && <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      <div className={styles.burgerMenu} onClick={() => setIsMenuOpen((prev) => !prev)}>
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.62292 22.7092V20.5801H26.377V22.7092H3.62292ZM3.62292 16.0645V13.9354H26.377V16.0645H3.62292ZM3.62292 9.41977V7.2832H26.377V9.41977H3.62292Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src={logo} alt="Ligo logo" />
      </div>
      <div className={styles.navMenu}>
        <NavLink to="/about" className={styles.navMenuItem}>
          Про нас
        </NavLink>
        <NavLink to="/collaboration" className={styles.navMenuItem}>
          Співпраця
        </NavLink>
        <NavLink to="/delivery" className={styles.navMenuItem}>
          Оплата і доставка
        </NavLink>
        <NavLink to="/contacts" className={styles.navMenuItem}>
          Контакти
        </NavLink>
      </div>
      <div className={styles.navMenuIcons}>
        <ShoppingCartOutlined className={styles.navMenuIcon} onClick={handleCartClick} />
        <UserOutlined className={styles.navMenuIcon} onClick={handleLoginClick} />
        {isLoginOpen || isCartOpen ? (
          <div className={styles.cartOrLoginWindow}>
            {isLoginOpen ? <LoginWindow setIsLoginOpen={setIsLoginOpen} /> : null}
            {isCartOpen ? <CartWindow handleCartClick={handleCartClick} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyHeader;
