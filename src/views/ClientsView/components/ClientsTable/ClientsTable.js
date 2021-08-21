import { Breadcrumb, Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SyncOutlined
} from '@ant-design/icons';
import React, { Fragment } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Title from 'antd/lib/typography/Title';
import { Link, useHistory } from 'react-router-dom';

const statuses = ['PENDING', 'ACTIVE', 'DISABLED'];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    firstName: ' Rutakayile',
    lastName: ' Samuel',
    address: 'Ndera, Caraes KN5 RD122',
    accountStatus: statuses[Math.floor(Math.random() * 3)],
    createdOn: '1997-07-16T19:20+01:00',
    activeDevicesNo: 12
  });
}

const getStatusColor = (status) => {
  if (status === 'PENDING') return '#f2c11d';
  if (status === 'ACTIVE') return 'green';
  if (status === 'DISABLED') return 'red';
};

console.log(data);

const ClientsTable = () => {
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
          <Breadcrumb.Item>Client</Breadcrumb.Item>
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
          <Col offset={2}>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic
                title={<Title level={4}>Total</Title>}
                value={100}
                valueStyle={{ color: '#51befc' }}
              />
            </Card>
          </Col>
          <Col>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic
                title={<Title level={4}>Active</Title>}
                value={12}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic
                title={<Title level={4}>Disabled</Title>}
                value={11.28}
                precision={2}
                valueStyle={{ color: '#f72828' }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic
                title={<Title level={4}>Pending</Title>}
                value={11.28}
                precision={2}
                valueStyle={{ color: '#f7c728' }}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Button
            block
            type="primary"
            onClick={() => {
              history.push('/clients/new');
            }}
          >
            ADD CLIENT
          </Button>
        </Row>
        <br />
        <Table
          pagination={{
            pageSize: 10
          }}
          dataSource={data}
        >
          <Column title={'#'} render={(_, __, idx) => idx + 1} />
          <Column
            title={'Names'}
            render={(record) => (
              <Fragment>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: '12px' }}>{`${record?.firstName} ${record?.lastName}`}</span>
              </Fragment>
            )}
          />
          <Column title={'Current Address'} render={(record) => record.address} />
          <Column title={'No Devices'} render={(record) => record.activeDevicesNo} />
          <Column
            title={'Acc. Status'}
            render={(record, idx) => (
              <Tag color={getStatusColor(record.accountStatus)} key={idx}>
                {record.accountStatus}
              </Tag>
            )}
          />
          <Column title={'Joined date'} render={(record) => new Date(record.createdOn).toUTCString()} />

          <Column
            title={'Action'}
            render={(record) => (
              <Row style={{ justifyContent: 'space-evenly' }}>
                <EditOutlined onClick={() => {}} />
                <UnorderedListOutlined
                  onClick={() => {
                    history.push('/clients/1740ef5c-c43c-419d-beac-564b946a8538');
                  }}
                />
                <DeleteOutlined onClick={() => {}} />
                <SyncOutlined />
              </Row>
            )}
          />
        </Table>
      </Card>
    </Fragment>
  );
};

export default ClientsTable;
