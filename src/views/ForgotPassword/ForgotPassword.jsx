import { Button, Form, Input, message, Result, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  forgotPasswordInitialValues,
  forgotPasswordValidationSchema
} from '../../validations/forgot-password.validation';
import Title from 'antd/lib/typography/Title';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useForgotPassword from '../../hooks/api/auth/useForgotPassword';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
  const history = useHistory();
  const [isSuccessMessageVisible, setShowSuccessMessage] = useState(false);
  const forgotPassword = useForgotPassword();

  console.log(forgotPassword);

  useHandleApiState(forgotPassword, {
    onSuccess: () => {
      setShowSuccessMessage(true);
    },
    onError: (error) => {
      message.error(getErrorFromUnknown(error));
    }
  });

  if (isSuccessMessageVisible)
    return (
      <div style={{ height: '100vh' }}>
        <div style={{ paddingTop: '30vh' }}>
          <Result
            status="success"
            title="Check your email!"
            subTitle="We've sent a reset link to your email, use before the next 24hrs"
            extra={[<Button onClick={() => history.replace('/login')}>Back to login</Button>]}
          />
        </div>
      </div>
    );

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ paddingTop: '30vh', width: '100%' }}>
        <Row justify="center">
          <div style={{ textAlign: 'center' }}>
            <img
              src={window.location.origin + '/img/logo.png'}
              style={{
                height: '120px',
                aspectRatio: 3 / 2
              }}
              alt="Logo"
            />
            <br />
            <Title level={3} className="login-title">
              Reset your password
            </Title>
          </div>
        </Row>

        <Row justify="center">
          <Formik
            initialValues={forgotPasswordInitialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={(formData) => {
              forgotPassword.sendRequest(formData);
            }}
          >
            {(formikProps) => {
              return (
                <Form
                  style={{ width: '40%' }}
                  onFinish={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <Form.Item
                    name="email"
                    validateStatus={getValidationStatus(formikProps, 'email')}
                    help={getHelp(formikProps, 'email')}
                  >
                    <Input
                      size="large"
                      name="email"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange('email')}
                    />
                  </Form.Item>
                  <Button
                    style={{ marginBottom: '12px' }}
                    block
                    loading={forgotPassword.isLoading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Reset password
                  </Button>
                  <Button
                    block
                    type="link"
                    htmlType="submit"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
