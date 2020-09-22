import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { Input, Form } from 'formik-antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * Component representing a login view
 * @author Rutakayile Samuel
 * @version 1.0
 */
const LoginForm = ({
  errors = {},
  touched = {},
  loginState = { success: false, loading: false, message: '', error: null }
}) => {
  /* Use effect to display api error if not null */
  useEffect(() => {
    if (loginState.error) {
      message.error(loginState.error);
    }
  }, [loginState.error]);

  return (
    <Form>
      <Form.Item
        name="username"
        validateStatus={errors.username && touched.username ? 'error' : ''}
        help={touched.username && errors.username && errors.username}
      >
        <Input
          name="username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        validateStatus={errors.password && touched.password ? 'error' : ''}
        help={touched.password && errors.password && errors.password}
      >
        <Input.Password
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Button
        block
        loading={loginState.loading}
        type="primary"
        htmlType="submit"
        className="login-form-button"
      >
        Log in
      </Button>
      {/*
        @TODO: Create forgot password view
        <Row>
        <Link style={{ marginTop: '12px' }} to="/">
          Forgot password
        </Link>
      </Row>
      */}
    </Form>
  );
};

LoginForm.propTypes = {
  /* Object holding errors based on field name */
  errors: PropTypes.object,
  /* Object holding touched fields based on field name */
  touched: PropTypes.object,
  /* Object holding state of the form api request  */
  loginState: PropTypes.object
};

export default LoginForm;
