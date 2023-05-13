import React, { createRef, useContext, useState } from 'react';
import styles from './LoginWindow.module.scss';
import { Button, Form, Input, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import LogoutWindow from '../LogoutWindow/LogoutWindow';

const LoginWindow = ({ setIsLoginOpen }) => {
  const formRef = createRef();
  const [form] = Form.useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const { actions, isAuth } = useContext(AppContext);
  const login = actions.login;

  const { isLoading } = login;

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const onFinish = (values) => {
    login.mutate(values);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spin spinning={true} size="default" className={styles.spinner} />
      </div>
    );
  }

  if (isAuth) {
    return <LogoutWindow />;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Увійдіть</h3>
      <Form
        ref={formRef}
        name="login"
        onFinish={onFinish}
        form={form}
        onFieldsChange={handleFormChange}
        className={styles.form}
      >
        <Form.Item
          name="email"
          className={styles.form__input}
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
          <Input placeholder="Логін" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          className={styles.form__input}
          rules={[
            {
              required: true,
              min: 8,
              max: 24,
              whitespace: false,
              message: 'Incorrect password, try another',
            },
          ]}
        >
          <Input type="password" placeholder="Пароль" autoComplete="off" />
        </Form.Item>
        <Form.Item className={styles.button__container}>
          <Button type="primary" htmlType="submit" className={styles.form__button} disabled={disabledSave}>
            Увійти
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.registration}>
        <p>Не маєте акаунта?</p>
        <NavLink to="/" onClick={() => actions.setShowRegisterModal(true)}>
          Зареєструйтесь
        </NavLink>
      </div>
    </div>
  );
};

export default LoginWindow;
