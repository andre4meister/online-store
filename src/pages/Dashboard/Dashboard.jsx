import React, {useContext} from 'react';
import styles from './Dashboard.module.scss';
import {Button, Form, Input} from "antd";
import bannerImage from '../../assets/images/banner.png';
import discountImage from '../../assets/images/discount.png';
import discountStar from '../../assets/stars/discountStar.svg';
import purpleBigStar from '../../assets/stars/purpleBigStar.svg';
import interfacePurpleSmall from '../../assets/stars/interfacePurpleSmall.svg';
import photo1 from '../../assets/images/photo1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import photo3 from '../../assets/images/photo3.jpg';
import photo4 from '../../assets/images/photo4.jpg';
import photo5 from '../../assets/images/photo5.jpg';
import photo6 from '../../assets/images/photo6.jpg';
import ukraineSign from '../../assets/images/ukraineSign.png';
import interfaceLimeSmall from '../../assets/stars/interfaceLimeSmall.svg';
import inst from '../../assets/interface/inst.svg';
import tg from '../../assets/interface/tg.svg';
import logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {UserAPI} from "../../services/userAPI";
import setUserData from "../../utils/user/setUserData";
import Loader from "../../components/Loader/Loader";
import {ItemApi} from "../../services/itemApi";
import DashboardContext from "../../context/DashboardContext";

const mockItems = [
    {
        id: 1,
        photo: photo1,
        name: 'Оверсайз футболка “Hello Baiden”',
        price: 1400,
    },
    {
        id: 2,
        photo: photo2,
        name: 'Оверсайз футболка “F16”',
        price: 1000,
    },
    {
        id: 3,
        photo: photo3,
        name: 'Оверсайз футболка “Хай, Марс”',
        price: 1000,
    },
    {
        id: 4,
        photo: photo4,
        name: 'Оверсайз футболка “hppy”',
        price: 800,
    },
    {
        id: 5,
        photo: photo5,
        name: 'Оверсайз футболка “Борітеся”',
        price: 1400,
    },
    {
        id: 6,
        photo: photo6,
        name: 'Оверсайз футболка “ї”',
        price: 900,
    },
]
const Dashboard = () => {
    const {allItems, discountItem, ewItem, collection} = useContext(DashboardContext)

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.banner__image}>
                    <img src={bannerImage} alt="banner"/>
                </div>
                <div className={styles.banner__info}>
                    <h1>Заціни, яку новинку ми завезли!</h1>
                    <p>Ця крутезна футболка чекає свого модного власника.</p>
                    <Button className={styles.banner__button}>Дивитись</Button>
                </div>
                <div className={styles.discountStar}>
                    <img src={purpleBigStar} alt="bannerStar"/>
                    <p>10% знижки при першому замовлені</p>
                </div>
            </div>

            <div className={styles.discount}>
                <div className={styles.title}>
                    <h2>Знижка</h2>
                    <div>
                        <img src={interfacePurpleSmall} alt="interfacePurpleSmall"/>
                    </div>
                </div>
                <div className={styles.discount__block}>
                    <div className={styles.discount__block__image}>
                        <img src={discountItem.photos[0]} alt="discount"/>
                        <div className={styles.discount__block__image__star}>
                            <img src={discountStar} alt="discount"/>
                        </div>
                    </div>
                    <div className={styles.discount__block__info}>
                        <span>{discountItem.name}</span>
                        <div className={styles.price}>
                            <h3>{`${discountItem.discountPrice} ГРН`}</h3>
                            <p>{`${discountItem.price} ГРН`}</p>
                        </div>
                        <Button className={styles.discount__block__button}>Додати у кошик</Button>
                    </div>
                </div>
            </div>
            <div className={styles.products}>
                <div className={styles.title}>
                    <h2>Колекція</h2>
                    <div>
                        <img src={interfacePurpleSmall} alt="interfacePurpleSmall"/>
                    </div>
                </div>
                <ul className={styles.products__list}>
                    {collection.map(item => (
                        <li className={styles.products__item} key={item.id}>
                            <div className={styles.item__image}
                                 style={{backgroundImage: `url(${item.photos[0]})`}}>
                                {/*<img src={item.photos[0]} alt="product"/>*/}
                            </div>
                            <div className={styles.item__info}>
                                <p className={styles.item__info__name}>{item.name}</p>
                                <p className={styles.item__info__price}>{item.discountPrice || item.price + ' ГРН'}</p>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </div>

            <div className={styles.charity}>
                <div className={styles.charity__image}>
                    <img src={ukraineSign} alt="product"/>
                </div>
                <div className={styles.charity__info}>
                    <h2>Ми допомагаємо ЗСУ</h2>
                    <p>50% з кожної продажі йдуть на військові потреби Збройним силам України. Наша свобода виборюється
                        потом та кров’ю захисниками кожною секундою, це найменше, що ми можемо зробити для наших
                        захисників!</p>
                </div>
            </div>

            <div className={styles.news}>
                <div className={styles.news__info}>
                    <div className={styles.info__title}>
                        <h2>Дізнавайтесь про нові колекції!</h2>
                        <div className={styles.title__stars}>
                            <div className={styles.title__left_star}>
                                <img src={interfaceLimeSmall} alt="interfaceLimeSmall"/>
                            </div>
                            <div className={styles.title__right_star}>
                                <img src={interfaceLimeSmall} alt="interfaceLimeSmall"/>
                            </div>
                        </div>
                    </div>
                    <p>Підпишіться на нашу розсилку, щоб першим дізнаватись про обнову в колеціях.</p>
                </div>
                <Form className={styles.news__form}>
                    <Input className={styles.form__input} placeholder="Email"/>
                    <Button className={styles.form__button} onClick={() => alert('email added')}>Підписатись</Button>
                </Form>
            </div>
        </div>
    );
};

export default Dashboard;