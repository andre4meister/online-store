import React, { useContext } from 'react';
import styles from './Dashboard.module.scss';
import { Button, Form, Input } from 'antd';
import discountStar from '../../assets/stars/discountStar.svg';
import interfacePurpleSmall from '../../assets/stars/interfacePurpleSmall.svg';
import ukraineSign from '../../assets/images/ukraineSign.png';
import interfaceLimeSmall from '../../assets/stars/interfaceLimeSmall.svg';
import DashboardContext from '../../context/DashboardContext';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import getCartItemStatus from '../../utils/user/getCartItemStatus';
import Banner from '../../components/Banner/Banner';

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToItem = (id) => {
    navigate(`/item/${id}`);
  };

  const { discountItem, newItem, collection } = useContext(DashboardContext);
  const { actions } = useContext(AppContext);

  const [form] = Form.useForm();
  const newsInputRef = React.createRef();

  const { isLoading } = actions.addItemToCart;

  const handleSubscribeNews = () => {
    const email = form.getFieldValue('email');
    actions.setAlert({ type: 'success', message: `Ви успішно підписались на новини! Ваш email - ${email}` });
    form.resetFields();
  };

  const addToCart = (id) => {
    actions.addItemToCart.mutate(id);
  };

  return (
    <div className={styles.container}>
      <Banner navigateToItem={navigateToItem} newItemId={newItem.id} />
      <div className={styles.main}>
        <div className={styles.discount}>
          <div className={styles.title}>
            <h2>Знижка</h2>
            <div>
              <img src={interfacePurpleSmall} alt="interfacePurpleSmall" />
            </div>
          </div>
          <div className={styles.discount__block}>
            <div className={styles.discount__block__image}>
              <img onClick={() => navigateToItem(discountItem.id)} src={discountItem.photos[0]} alt="discount" />
              <div className={styles.discount__block__image__star}>
                <img src={discountStar} alt="discount" />
              </div>
            </div>
            <div className={styles.discount__block__info}>
              <span>{discountItem.name}</span>
              <div className={styles.price}>
                <h3>{`${discountItem.discountPrice} ГРН`}</h3>
                <p>{`${discountItem.price} ГРН`}</p>
              </div>
              <Button
                disabled={isLoading || getCartItemStatus(discountItem.id)}
                className={styles.discount__block__button}
                onClick={() => addToCart(discountItem.id)}
              >
                Додати у кошик
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.products}>
          <div className={styles.title}>
            <h2>Колекція</h2>
            <div>
              <img src={interfacePurpleSmall} alt="interfacePurpleSmall" />
            </div>
          </div>
          <ul className={styles.products__list}>
            {collection.map((item) => (
              <li className={styles.products__item} key={item.id}>
                <div
                  className={styles.item__image}
                  onClick={() => navigateToItem(item.id)}
                  style={{ backgroundImage: `url(${item.photos[0]})` }}
                ></div>
                <div className={styles.item__info}>
                  <p className={styles.item__info__name}>{item.name}</p>
                  <p className={styles.item__info__price}>{`${item.discountPrice || item.price} ГРН`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.charity}>
          <div className={styles.charity__image}>
            <img src={ukraineSign} alt="product" />
          </div>
          <div className={styles.charity__info}>
            <h2>Ми допомагаємо ЗСУ</h2>
            <p>
              50% з кожної продажі йдуть на військові потреби Збройним силам України. Наша свобода виборюється потом та
              кров’ю захисниками кожною секундою, це найменше, що ми можемо зробити для наших захисників!
            </p>
          </div>
        </div>
      </div>
      <div className={styles.news}>
        <div className={styles.news__info}>
          <div className={styles.info__title}>
            <h2>Дізнавайтесь про нові колекції!</h2>
            <div className={styles.title__stars}>
              <div className={styles.title__left_star}>
                <img src={interfaceLimeSmall} alt="interfaceLimeSmall" />
              </div>
              <div className={styles.title__right_star}>
                <img src={interfaceLimeSmall} alt="interfaceLimeSmall" />
              </div>
            </div>
          </div>
          <p>Підпишіться на нашу розсилку, щоб першим дізнаватись про обнову в колеціях.</p>
        </div>
        <Form form={form} className={styles.news__form}>
          <Form.Item
            name="email"
            className={styles.form__item}
            rules={[
              {
                required: true,
                min: 8,
                max: 26,
                whitespace: false,
                message: 'Incorrect email, try another',
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ),
              },
            ]}
          >
            <Input className={styles.form__input} placeholder="Email" />
          </Form.Item>
          <Button className={styles.form__button} onClick={handleSubscribeNews}>
            Підписатись
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
