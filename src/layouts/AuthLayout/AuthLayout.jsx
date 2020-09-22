import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

export default function AuthLayout({ children }) {
  return (
    <Row style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <Col style={{ background: '#2d85c4' }} lg={{ span: 16 }} md={{ span: 0 }} xs={{ span: 0 }}>
        <img width="100%" height="100%" src={window.location.origin + '/img/login_cover.jpg'} alt="" />
      </Col>
      <Col lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 12 }} offset={1}>
        <Row style={{ marginTop: '30vh' }}>{children}</Row>
      </Col>
    </Row>
  );
}

AuthLayout.propTypes = {
  /* Children components to be rendered inside layout */
  children: PropTypes.object
};
