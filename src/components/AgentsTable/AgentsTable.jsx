import React, { Fragment } from 'react';
import { Breadcrumb, Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SyncOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';

const statuses = ['ASSIGNED', 'UNASSIGNED', 'DISABLED'];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    firstName: ' Rutakayile',
    lastName: ' Samuel',
    address: 'Ndera, Caraes KN5 RD122',
    accountStatus: statuses[Math.floor(Math.random() * 3)],
    createdOn: '1997-07-16T19:20+01:00',
    email: 'agent@watamita.com',
    phoneNo: '+250788888888'
  });
}

const getStatusColor = (status) => {
  if (status === 'ASSIGNED') return 'green';
  if (status === 'DISABLED') return 'red';
};

const AgentsTable = () => {
  const history = useHistory();
  return (
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
      <Column title={'Email'} render={(record) => record.email} />
      <Column title={'Phone No.'} render={(record) => record.phoneNo} />
      <Column
        title={'Status'}
        render={(record, idx) => (
          <Tag color={getStatusColor(record.accountStatus)} key={idx}>
            {record.accountStatus}
          </Tag>
        )}
      />
      <Column
        title={'Last Active'}
        render={(record) => (
          <Fragment>
            <HistoryOutlined style={{ paddingRight: '12px' }} />
            {new Date(record.createdOn).toUTCString()}
          </Fragment>
        )}
      />
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
          </Row>
        )}
      />
    </Table>
  );
};

export default AgentsTable;
