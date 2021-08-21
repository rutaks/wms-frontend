import { Breadcrumb, Card, Col, Divider, PageHeader, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AgentForm from '../../components/AgentForm';

const CreateAgentView = () => {
  const history = useHistory();

  return (
    <Col style={{ marginBottom: '12px' }} offset={4} xs={24} sm={16} md={16} lg={16} xl={16}>
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
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/agents');
              }}
            >
              Employees
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>New Employee</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <PageHeader
          onBack={() => history.goBack()}
          title="Create Employee"
          subTitle="Fill in the necessary info"
        />
        <Divider />
        <AgentForm isSubmitting={false} isUploadingImg={false} onSubmit={() => {}} />
      </Card>
      <br />
      <br />
      <br />
      <br />
    </Col>
  );
};

export default CreateAgentView;
