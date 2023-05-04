import React from 'react';
import styles from './Footer.module.scss';
import logo from "../../assets/images/logo.png";
import {Link} from "react-router-dom";
import inst from "../../assets/interface/inst.svg";
import tg from "../../assets/interface/tg.svg";

const Footer = () => {
    return (
        <div className={styles.about}>
            <div className={styles.about__logo}>
                <div className={styles.logo__image}>
                    <img src={logo} alt="Ligo logo"/>
                    <p>Львів, вул. Героїв Упа 404</p>
                </div>
            </div>
            <div className={styles.about__menu}>
                <div className={styles.about__block_title}>
                    Допомога
                </div>
                <div className={styles.menu_items}>
                    <Link to="contacts" className={styles.menu_item}>Контакти</Link>
                    <Link to="delivery" className={styles.menu_item}>Оплата і доставка</Link>
                    <Link to="returning" className={styles.menu_item}>Повернення</Link>
                    <Link to="sizes" className={styles.menu_item}>Таблиця розмірів</Link>
                </div>
            </div>
            <div className={styles.about__politics}>
                <div className={styles.about__block_title}>
                    Умови
                </div>
                <div className={styles.menu_items}>
                    <Link to="contacts" className={styles.menu_item}>Політика конфіденційності</Link>
                    <Link to="delivery" className={styles.menu_item}>Політика щодо файлів кукі</Link>
                </div>
            </div>
            <div className={styles.media}>
                <div className={styles.about__block_title}>
                    Ми в соціальних мережах
                </div>
                <div className={styles.media__icons}>
                    <Link to="https://www.instagram.com/">
                        <img src={inst} alt="instagram"/>
                    </Link>
                    <Link to="https://www.instagram.com/">
                        <img src={tg} alt="telegram"/>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Footer;