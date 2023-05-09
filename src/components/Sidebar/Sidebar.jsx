import styles from './Sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Modal} from "antd";
import {useContext} from "react";
import {CloseOutlined} from "@ant-design/icons";
import AppContext from "antd/es/app/context";

const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
    const { isAuth } = useContext(AppContext);

    const closeSidebar = () => {
        setIsMenuOpen(false);
    }
    return (
        <Modal className={styles.modal}
               footer={null}
               onCancel={closeSidebar}
               closable={true}
               open={isMenuOpen}
               keyboard={true}
               closeIcon={<CloseOutlined className={styles.closeIcon}/>}
        >
            <div className={styles.sidebar}>
                <div className={styles.navItem}>
                    <NavLink to="about" onClick={closeSidebar}>Про нас</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink to="collaboration" onClick={closeSidebar}>Співпраця</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink to="delivery" onClick={closeSidebar}>Оплата і доставка</NavLink>
                </div>
                <div className={styles.navItem}>
                    <NavLink to="contacts" onClick={closeSidebar}>Контакти</NavLink>
                </div>
                <div className={styles.navItem}>
                   <Button className={styles.sidebar__button}>{isAuth ? "Увійти" : "Вийти"}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Sidebar;