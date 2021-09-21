import React, { Fragment } from 'react';
import { Breadcrumb, Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import AgentsTable from '../../components/AgentsTable/AgentsTable';
import ReportsTable from '../../components/ReportsTable';
import BillingsTable from '../../components/BillingsTable/BillingsTable';

const BillingView = () => {
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
          <Breadcrumb.Item>Bills</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <br />
        <BillingsTable />
      </Card>
    </Fragment>
  );
};

export default BillingView;
