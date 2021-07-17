import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Input, Form, Row } from 'antd';
import { Formik } from 'formik';
import Title from 'antd/lib/typography/Title';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthLayout from '../../layouts/AuthLayout';
import { loginInitialValues, loginValidationSchema } from '../../validations/login.validation';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import { useHistory } from 'react-router-dom';
import useLogin from '../../hooks/api/auth/useLogin';
import useHandleApiState from '../../hooks/useHandleApiState';
import useAuth from '../../context/Auth/useAuth';

const Login = () => {
  const login = useLogin();
  const auth = useAuth();
  const history = useHistory();

  useHandleApiState(login, {
    onSuccess: (response) => {
      const { payload } = response;
      auth.loginUser(payload);
      history.push('/');
    },
    onError: (error) => console.log(error)
  });

  return (
    <AuthLayout>
      <center>
        <Row
          style={{ marginLeft: '160px', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
        >
          <Col style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <img
              src={window.location.origin + '/img/logo.png'}
              style={{
                height: '120px',
                aspectRatio: 3 / 2
              }}
              alt="Logo"
            />
            <br />
            <Title className="login-title">WMS</Title>
          </Col>
        </Row>
      </center>
      <Col span={24}>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={(body) => {
            login.sendRequest(body);
          }}
        >
          {(formikProps) => {
            return (
              <Fragment>
                <Form.Item
                  name="email"
                  validateStatus={getValidationStatus(formikProps, 'email')}
                  help={getHelp(formikProps, 'email')}
                >
                  <Input
                    name="username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    value={formikProps.values.email}
                    onChange={formikProps.handleChange('email')}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  validateStatus={getValidationStatus(formikProps, 'password')}
                  help={getHelp(formikProps, 'password')}
                >
                  <Input.Password
                    name="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    value={formikProps.values.password}
                    onChange={formikProps.handleChange('password')}
                  />
                </Form.Item>
                <Button
                  style={{ marginBottom: '12px' }}
                  block
                  loading={login.loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  Log in
                </Button>
                <Button
                  block
                  type="link"
                  htmlType="submit"
                  onClick={() => {
                    history.push('/forgot-password');
                  }}
                >
                  Forgot Password? Click here
                </Button>
              </Fragment>
            );
          }}
        </Formik>
      </Col>
    </AuthLayout>
  );
};

Login.propTypes = {
  loginState: PropTypes.object,
  loginAction: PropTypes.func
};

export default Login;
