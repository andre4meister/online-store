import React from 'react';
import styles from './CartWindow.module.scss';
import photo1 from '../../assets/images/photo1.jpg';
import photo2 from '../../assets/images/photo2.jpg';
import {Button} from "antd";
import getTotalSum from "../../utils/cart/getTotalSum";

const mockCartItems = [
    {
        id: 1,
        photo: photo1,
        name: 'Оверсайз футболка “Hello Baiden”',
        price: 1400,
        quantity: 1
    },
    {
        id: 2,
        photo: photo2,
        name: 'Оверсайз футболка “F16”',
        price: 1000,
        quantity: 1
    },
];
const CartWindow = ({handleCartClick}) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{`Корзина(${mockCartItems.length})`}</p>
            <div className={styles.cart__close} onClick={handleCartClick}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M7.78125 23.5312L6.46875 22.2188L13.6875 15L6.46875 7.78125L7.78125 6.46875L15 13.6875L22.2188 6.46875L23.5312 7.78125L16.3125 15L23.5312 22.2188L22.2188 23.5312L15 16.3125L7.78125 23.5312Z" />
                </svg>
            </div>
            <ul className={styles.cartList}>
                {mockCartItems.map((item) => (
                    <li className={styles.cartItem} key={item.id}>
                        <div className={styles.cartItem__image}
                             style={{backgroundImage: `url(${item.photo})`}}>
                        </div>
                        <div className={styles.cartItem__info}>
                            <div className={styles.cartItem__price}>
                                <p>{`${item.price} ГРН`}</p>
                            </div>
                            <div className={styles.cartItem__name}>
                                <p>{item.name}</p>
                            </div>
                        </div>
                        <div className={styles.cartItem__delete}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M8.15625 26.25C7.64062 26.25 7.19922 26.0664 6.83203 25.6992C6.46484 25.332 6.28125 24.8906 6.28125 24.375V6.5625H5V4.6875H10.875V3.75H19.125V4.6875H25V6.5625H23.7188V24.375C23.7188 24.875 23.5312 25.3125 23.1562 25.6875C22.7812 26.0625 22.3438 26.25 21.8438 26.25H8.15625ZM21.8438 6.5625H8.15625V24.375H21.8438V6.5625ZM11.4688 21.6875H13.3438V9.21875H11.4688V21.6875ZM16.6562 21.6875H18.5312V9.21875H16.6562V21.6875Z"/>
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.total}>
                <p className={styles.total__label}>До сплати:</p>
                <p className={styles.total__sum}>{`${getTotalSum(mockCartItems)} ГРН`}</p>
            </div>
            <Button className={styles.cart__button}>Оплатити</Button>
        </div>
    );
};

export default CartWindow;