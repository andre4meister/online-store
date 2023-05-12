import styles from './ItemPage.module.scss';
import { Button, Image } from 'antd';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import getCartItemStatus from '../../utils/user/getCartItemStatus';
import interfacePurpleSmall from '../../assets/stars/interfacePurpleSmall.svg';

const ItemPage = ({ item }) => {
  const { id, name, photos, price, discountPrice, isAvailable } = item;

  const { actions } = useContext(AppContext);
  const { isLoading, data, error } = actions.addItemToCart;

  const addToCart = (id) => {
    actions.addItemToCart.mutate(id);
  };

  const [mainPhoto, ...otherPhotos] = photos;

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <div>Колекція</div>
        <div className={styles.title__image}>
          <img src={interfacePurpleSmall} alt="interfacePurpleSmall" />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.item__main}>
          <div className={styles.item__main__photos}>
            <div className={styles.photos__others}>
              {otherPhotos.map((photo, index) => (
                <Image className={styles.secondaryPhoto} key={index} src={photo} />
              ))}
            </div>
            <div className={styles.photos__main}>
              <Image src={mainPhoto} className={styles.mainPhoto} />
            </div>
          </div>
          <div className={styles.item__main__info}>
            <div className={styles.info__name_price}>
              <h3>{name}</h3>
              <p>{`${discountPrice || price} ГРН`}</p>
            </div>
            <div className={styles.info__color}>
              <span>Колір</span>
              <div className={styles.info__color__block}></div>
            </div>
            <div className={styles.info__sizes}>
              <span>Розмір</span>
              <div className={styles.info__sizes__block}>
                <div className={styles.size}>M</div>
                <div className={styles.size}>L</div>
                <div className={styles.size}>XL</div>
              </div>
            </div>
            <Button
              onClick={() => addToCart(id)}
              className={styles.info__button}
              disabled={!isAvailable || getCartItemStatus(item.id)}
              loading={isLoading}
            >
              Додати у кошик
            </Button>
          </div>
        </div>
        <div className={styles.item__description}>
          <div className={styles.item__description__block}>
            <h3>Опис</h3>
            <p>
              Оверсайз футболка від бренду Ligo. Стильна футболка, яка відрізняється від звичайної більшим розміром та
              забезпечує комфорт. Футболка виготовлена зі високоякісних матеріалів, які не будуть дратувати шкіру та
              забезпечать довговічність.
            </p>
          </div>
          <div className={styles.item__description__block}>
            <h3>Склад</h3>
            <p>90% коттон, 10% поліестер</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
