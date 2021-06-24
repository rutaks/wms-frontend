import { Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import React, { Fragment } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Title from 'antd/lib/typography/Title';

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
  return (
    <Fragment>
      <Row gutter={24} align="middle" style={{ padding: '12px' }}>
        <Col flex="auto">
          <Title level={4}>50 Clients</Title>
        </Col>
        <Col flex="none">
          <Button type="primary" onClick={() => {}}>
            ADD CLIENT
          </Button>
        </Col>
      </Row>
      <Row gutter={20} align="middle" style={{ padding: '12px' }}>
        <Col offset={2}>
          <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
            <Statistic title={<Title level={4}>Total</Title>} value={100} valueStyle={{ color: '#51befc' }} />
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
              <UnorderedListOutlined onClick={() => {}} />
              <DeleteOutlined onClick={() => {}} />
            </Row>
          )}
        />
      </Table>
    </Fragment>
  );
};

export default ClientsTable;
