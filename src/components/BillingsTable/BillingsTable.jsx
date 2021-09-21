import React, { Fragment, useState } from 'react';
import { Breadcrumb, Button, Card, Col, Dropdown, Menu, Row, Statistic, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ControlOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';
import AssignReportToAgent from '../AssignReportToAgent/AssignReportToAgent';

const paymentMediums = ['MTN Mobile Money', 'VISA', 'CASH'];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    firstName: 'Rutakayile',
    lastName: 'Samuel',
    deviceCode: 'CFFSD',
    usage: `${300} mᶟ`,
    amount: '1200 rwf',
    paymentDate: '1997-07-16T19:20+01:00',
    paymentOwner: 'Rutakayile Samuel',
    paymentMedium: paymentMediums[Math.floor(Math.random() * 3)]
  });
}

const getStatusColor = (status) => {
  if (status === 'ASSIGNED') return 'green';
  if (status === 'DISABLED') return 'red';
};

const BillingsTable = () => {
  return (
    <Fragment>
      <Table
        pagination={{
          pageSize: 10
        }}
        dataSource={data}
      >
        <Column title={'#'} render={(_, __, idx) => idx + 1} />
        <Column
          title={'Paid By'}
          render={(record) => (
            <Fragment>
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: '12px' }}>{`${record?.firstName} ${record?.lastName}`}</span>
            </Fragment>
          )}
        />
        <Column
          title={'Paid Device'}
          render={(record) => (
            <Fragment>
              <Avatar icon={<ControlOutlined />} />
              <span style={{ marginLeft: '12px' }}>{record?.deviceCode}</span>
            </Fragment>
          )}
        />
        <Column
          title={'Payment date'}
          render={(record, idx) => (
            <Fragment>
              <HistoryOutlined style={{ paddingRight: '12px' }} />
              {new Date(record.paymentDate).toUTCString()}
            </Fragment>
          )}
        />
        <Column
          title={'Payment Usage'}
          render={(record, idx) => <span style={{ marginLeft: '12px' }}>{record?.usage}</span>}
        />
        <Column title={'Amount Paid'} render={(record) => record.amount} />
        <Column title={'Payment Medium'} render={(record) => record.paymentMedium} />
      </Table>
    </Fragment>
  );
};

export default BillingsTable;
