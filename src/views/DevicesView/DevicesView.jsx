import React, { Fragment } from 'react';
import { Breadcrumb, Button, Card, Col, Row, Statistic } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import DevicesTable from '../../components/DevicesTable';

const DevicesView = () => {
  const history = useHistory();
  return (
    <Fragment>
      <Row style={{ paddingTop: '24px', marginLeft: '24px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/');
              }}
            >
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Employees</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <Row gutter={20} align="middle" style={{ padding: '12px' }}>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Active Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Inactive Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Damaged Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
        </Row>
        <br />
        <DevicesTable />
      </Card>
    </Fragment>
  );
};

export default DevicesView;
