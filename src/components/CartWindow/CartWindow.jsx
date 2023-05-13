import React, { useContext } from 'react';
import styles from './CartWindow.module.scss';
import { Button } from 'antd';
import getTotalSum from '../../utils/cart/getTotalSum';
import AppContext from '../../context/AppContext';
import CartWindowItem from '../CartWindowItem/CartWindowItem';

const CartWindow = ({ handleCartClick }) => {
  const { user, actions } = useContext(AppContext);
  const cartItems = user?.cart.cartItemsList || [];

  const { isLoading, error } = actions.createOrder;

  const itemsForOrder = cartItems.map((item) => ({ itemId: item.itemId, quantity: item.quantity }));
  const handleCreateOrder = () => {
    const orderBody = {
      userId: user.id,
      paymentStatus: 'notpayed',
      price: getTotalSum(cartItems),
      shipmentMethod: 'Ukr Poshta',
      delivery: {
        country: 'Ukraine',
        city: 'Lviv',
        postMethod: 'Ukr Poshta',
        chosenDepartment: 78059,
      },
      recipientInfo: {
        name: user.name || 'Andrii',
        surname: user.surname || 'Yarem',
        email: user.email,
        phone: user.phone,
      },
      items: itemsForOrder,
    };

    actions.createOrder.mutate(orderBody);
  };

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
          <CartWindowItem item={item} removeItemFromCart={actions.removeItemFromCart} key={item.id} />
        ))}
      </ul>
      {cartItems.length > 0 ? (
        <>
          <div className={styles.total}>
            <p className={styles.total__label}>До сплати:</p>
            <p className={styles.total__sum}>{`${getTotalSum(cartItems)} ГРН`}</p>
          </div>
          <Button onClick={handleCreateOrder} className={styles.cart__button} loading={isLoading}>
            Оплатити
          </Button>
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
