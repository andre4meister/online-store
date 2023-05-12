import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../Auth.module.scss';
import { useMutation } from '@tanstack/react-query';
import setUserData from '../../../utils/user/setUserData';
import { UserAPI } from '../../../services/userAPI';
import setToken from '../../../utils/user/setToken';

const Login = () => {
  const navigate = useNavigate();
  const navigateFromLogin = () => {
    navigate('/', { replace: true });
  };

  const formRef = React.createRef();
  const [form] = Form.useForm();
  const [disabledSave, setDisabledSave] = useState(true);

  const login = useMutation({
    mutationKey: ['login'],
    onSuccess: navigateFromLogin,
    mutationFn: async (values) => {
      const response = await UserAPI.login(values);
      const userData = response.data;
      setUserData(userData, true);
      setToken(userData.token);
      return userData;
    },
  });
  const { error, isLoading, data } = login;

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  const onFinish = (values) => {
    login.mutate(values);
  };

  return (
    <Card className={styles.form}>
      <Form
        size="large"
        layout="vertical"
        ref={formRef}
        name="login"
        onFinish={onFinish}
        form={form}
        onFieldsChange={handleFormChange}
      >
        <center>
          <h1>Login</h1>
        </center>
        <Form.Item
          name="email"
          label="Email"
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 8, max: 16, whitespace: false, message: 'Incorrect password, try another' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" disabled={disabledSave}>
            Log in
          </Button>
          <span className={styles.orSpan}>Or</span>
          <NavLink to="/registration">Register now</NavLink>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
