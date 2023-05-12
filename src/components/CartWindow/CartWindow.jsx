import React, { useContext } from 'react';
import styles from './CartWindow.module.scss';
import { Button, Spin } from 'antd';
import getTotalSum from '../../utils/cart/getTotalSum';
import AppContext from '../../context/AppContext';
import CartWindowItem from '../CartWindowItem/CartWindowItem';

const CartWindow = ({ handleCartClick }) => {
  const { user, actions } = useContext(AppContext);
  const cartItems = user?.cart.cartItemsList || [];

  const { isLoading, error } = actions.createOrder;
  const removeItemFromCart = (id) => {
    actions.removeItemFromCart.mutate(id);
  };

  if (isLoading) {
    return <Spin className={styles.spinner} size="default" />;
  }
  return (
    <div className={styles.container}>
      <p className={styles.title}>{`Корзина(${cartItems.length})`}</p>
      <div className={styles.cart__close} onClick={handleCartClick}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M7.78125 23.5312L6.46875 22.2188L13.6875 15L6.46875 7.78125L7.78125 6.46875L15 13.6875L22.2188 6.46875L23.5312 7.78125L16.3125 15L23.5312 22.2188L22.2188 23.5312L15 16.3125L7.78125 23.5312Z"
          />
        </svg>
      </div>
      <ul className={styles.cartList}>
        {cartItems.map(({ item }) => (
          <CartWindowItem item={item} key={item.id} />
        ))}
      </ul>
      {cartItems.length > 0 ? (
        <>
          <div className={styles.total}>
            <p className={styles.total__label}>До сплати:</p>
            <p className={styles.total__sum}>{`${getTotalSum(cartItems)} ГРН`}</p>
          </div>
          <Button className={styles.cart__button}>Оплатити</Button>
        </>
      ) : (
        <div
          className={styles.empty}
          style={{ backgroundImage: 'url(https://www.adasglobal.com/img/empty-cart.png)' }}
        />
      )}
    </div>
  );
};

export default CartWindow;
