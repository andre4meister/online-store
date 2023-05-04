import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import styles from './MyHeader.module.scss';
import {NavLink, useNavigate} from 'react-router-dom';
import {UserAPI} from '../../services/userAPI';
import AppContext from "../../context/AppContext";
import {useContext, useState} from "react";
import logo from '../../assets/images/logo.png';
import CartWindow from "../CartWindow/CartWindow";
import LoginWindow from "../LoginWindow/LoginWindow";

const MyHeader = ({}) => {
    const navigate = useNavigate();

    const onLogout = () => {
        UserAPI.logout();
    };
    const onLogin = () => {
        navigate('/login', {replace: true});
    };
    const navigateToCart = () => {
        navigate('/cart', {replace: true});
    };

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLoginClick = () => {
        console.log('handleLoginClick')
        setIsLoginOpen((prev) => !prev);
        setIsCartOpen(false);
    }

    const handleCartClick = () => {
        console.log('handleCartClick')
        setIsCartOpen((prev) => !prev);
        setIsLoginOpen(false);
    }

    const {isAuth} = useContext(AppContext);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                <img src={logo}
                     alt="Ligo logo"/>
            </div>
            <div className={styles.menu}>
                <NavLink to="/about" className={styles.menuItem}>
                    Про нас
                </NavLink>
                <NavLink to="/collaboration" className={styles.menuItem}>
                    Співпраця
                </NavLink>
                <NavLink to="/delivery" className={styles.menuItem}>
                    Оплата і доставка
                </NavLink>
                <NavLink to="/contacts" className={styles.menuItem}>
                    Контакти
                </NavLink>
            </div>
            <div className={styles.menuIcons}>
                <ShoppingCartOutlined className={styles.menuIcon} onClick={handleCartClick}/>
                <UserOutlined className={styles.menuIcon} onClick={handleLoginClick}/>
                {
                    isLoginOpen || isCartOpen
                        ?
                        <div className={styles.cartOrLoginWindow}>
                            {isLoginOpen ? <LoginWindow/> : null}
                            {isCartOpen ? <CartWindow handleCartClick={handleCartClick}/> : null}
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default MyHeader;
