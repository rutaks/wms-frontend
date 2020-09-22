import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'antd';
import { Formik } from 'formik';
import Title from 'antd/lib/typography/Title';
import { initialValues, validationSchema } from './formik';
import LoginForm from './LoginForm';
import loginAction from '../../redux/actions/user/login';
import AuthLayout from '../../layouts/AuthLayout';

const LoginContainer = ({ loginState, loginAction }) => {
  return (
    <AuthLayout>
      <Title className="login-title">WMS</Title>
      <Col span={24}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={({ username, password }) => {
            loginAction({ username, password });
          }}
        >
          {(props) => <LoginForm {...props} loginState={loginState} />}
        </Formik>
      </Col>
    </AuthLayout>
  );
};

LoginContainer.propTypes = {
  loginState: PropTypes.object,
  loginAction: PropTypes.func
};

const mapStateToProps = (state) => ({
  loginState: state.user.login
});

export default connect(mapStateToProps, { loginAction })(LoginContainer);
