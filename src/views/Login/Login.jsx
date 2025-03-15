import React, { Fragment, useState } from 'react';
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
import CustomMap from '../../components/Maps/CustomMap/CustomMap';

const Login = () => {
  const login = useLogin();
  const auth = useAuth();
  const history = useHistory();
  const childRef = React.useRef();
  const [locationName, setLocationName] = useState('');
  const locationNameFieldRef = React.useRef();
  const locationCoordinatesFieldRef = React.useRef();
  const [locationCoordinates, setLocationCoordinates] = useState({
    lat: '',
    lng: ''
  });

  useHandleApiState(login, {
    onSuccess: (response) => {
      const { payload } = response;
      auth.loginUser(payload);
      history.push('/issues');
    },
    onError: (error) => console.log(error)
  });

  return (
    <AuthLayout>
      <Row
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Col 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={window.location.origin + '/img/logo.png'}
            style={{
              height: '120px',
              width: 'auto'
            }}
            alt="Logo"
          />
          <Title className="login-title">FMS</Title>
        </Col>
      </Row>
      <Col span={24}>
        <br />
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
                  loading={login.isLoading}
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
        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#888' }}>powered by</span>
          </div>
          <a 
            href="https://ruubik.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none', 
              cursor: 'pointer' 
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px' 
            }}>
              <img 
                src={window.location.origin + '/img/ruubik-logo.jpg'} 
                alt="Ruubik Logo" 
                style={{ height: '30px', width: 'auto' }} 
              />
              <strong style={{ fontSize: '16px', color: '#555' }}>Ruubik</strong>
            </div>
          </a>
        </div>
      </Col>
    </AuthLayout>
  );
};

Login.propTypes = {
  loginState: PropTypes.object,
  loginAction: PropTypes.func
};

export default Login;
