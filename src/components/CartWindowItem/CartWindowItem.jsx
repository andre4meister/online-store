import styles from '../CartWindow/CartWindow.module.scss';

const CartWindowItem = ({ item, removeItemFromCart }) => {
  return (
    <li className={styles.cartItem} key={item.id}>
      <div className={styles.cartItem__image} style={{ backgroundImage: `url(${item.photos[0]})` }}></div>
      <div className={styles.cartItem__info}>
        <div className={styles.cartItem__price}>
          <p>{`${item.discountPrice || item.price} ГРН`}</p>
        </div>
        <div className={styles.cartItem__name}>
          <p>{item.name}</p>
        </div>
      </div>
      <div className={styles.cartItem__delete} onClick={() => removeItemFromCart(item.id)}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M8.15625 26.25C7.64062 26.25 7.19922 26.0664 6.83203 25.6992C6.46484 25.332 6.28125 24.8906 6.28125 24.375V6.5625H5V4.6875H10.875V3.75H19.125V4.6875H25V6.5625H23.7188V24.375C23.7188 24.875 23.5312 25.3125 23.1562 25.6875C22.7812 26.0625 22.3438 26.25 21.8438 26.25H8.15625ZM21.8438 6.5625H8.15625V24.375H21.8438V6.5625ZM11.4688 21.6875H13.3438V9.21875H11.4688V21.6875ZM16.6562 21.6875H18.5312V9.21875H16.6562V21.6875Z"
          />
        </svg>
      </div>
    </li>
  );
};

export default CartWindowItem;
