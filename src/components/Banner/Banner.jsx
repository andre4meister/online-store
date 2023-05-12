import React from 'react';
import styles from './Banner.module.scss';
import bannerImage from '../../assets/images/banner.png';
import bannerBigLimeStar from '../../assets/stars/bannerBigLimeStar2.svg';
import purpleBigStar from '../../assets/stars/purpleBigStar.svg';
import bannerLimeSmall from '../../assets/stars/bannerLimeSmall.svg';
import { Button } from 'antd';

const Banner = ({ navigateToItem, newItemId }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__image}>
        <div className={styles.banner__image__main} style={{ backgroundImage: `url(${bannerImage})` }} alt="banner" />
        <div className={styles.banner__image_bigStar}>
          <img src={bannerBigLimeStar} alt="bannerBigLimeStar" />
        </div>
        <div className={styles.discountStar}>
          <img src={purpleBigStar} alt="bannerStar" />
          <p>10% знижки при першому замовлені</p>
        </div>
        <div className={styles.banner__image_smallStar}>
          <img src={bannerLimeSmall} alt="interfaceLimeSmall" />
        </div>
      </div>
      <div className={styles.banner__info}>
        <h1>Заціни, яку новинку ми завезли!</h1>
        <p>Ця крутезна футболка чекає свого модного власника.</p>
        <Button className={styles.banner__button} onClick={() => navigateToItem(newItemId)}>
          Дивитись
        </Button>
      </div>
    </div>
  );
};

export default Banner;
