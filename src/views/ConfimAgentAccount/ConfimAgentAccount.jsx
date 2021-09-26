import { Button, Form, Input, message, Result, Row } from 'antd';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useResetPassword from '../../hooks/api/auth/useResetPassword';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';
import { useHistory, useParams } from 'react-router-dom';
import {
  resetPasswordInitialValues,
  resetPasswordValidationSchema
} from '../../validations/reset-password.validation copy';
import useActivateAccount from '../../hooks/api/employees/useActivateAccount';

const ConfimAgentAccount = () => {
  const history = useHistory();
  const { token } = useParams();
  const [isSuccessMessageVisible, setShowSuccessMessage] = useState(false);
  const activateAccount = useActivateAccount();

  useHandleApiState(activateAccount, {
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
          <Result status="success" title="All set!" subTitle="You can now login into the system!" />
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
              Confirm account
            </Title>
          </div>
        </Row>

        <Row justify="center">
          <Formik
            initialValues={resetPasswordInitialValues}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={(formData) => {
              activateAccount.sendRequest({ ...formData, token });
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
                    name="password"
                    validateStatus={getValidationStatus(formikProps, 'password')}
                    help={getHelp(formikProps, 'password')}
                  >
                    <Input.Password
                      size="large"
                      name="password"
                      placeholder="***********"
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange('password')}
                    />
                  </Form.Item>
                  <Button
                    style={{ marginBottom: '12px' }}
                    block
                    loading={activateAccount.isLoading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Change password
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

export default ConfimAgentAccount;
