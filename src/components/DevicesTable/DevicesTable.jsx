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
import { nanoid } from 'nanoid';
import { Link, useHistory } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';
import AssignReportToAgent from '../AssignReportToAgent/AssignReportToAgent';
import ChangeDeviceStatus from '../ChangeDeviceStatus';

const statuses = ['ACTIVE', 'DISABLED'];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    code: nanoid(5).toUpperCase(),
    usage: `${300} mᶟ`,
    currentOwner: 'Rutakayile Samuel',
    lastActiveTime: '1997-07-16T19:20+01:00',
    status: statuses[Math.floor(Math.random() * 2)]
  });
}

const getStatusColor = (status) => {
  if (status === 'ACTIVE') return 'green';
  if (status === 'DISABLED') return 'red';
};

const DevicesTable = ({ items, pagination, goToPage }) => {
  const history = useHistory();
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);
  return (
    <Fragment>
      <ChangeDeviceStatus
        isModalVisible={isLinkDeviceToClientModal}
        onOk={() => setIsLinkDeviceToClientModal(false)}
        onCancel={() => setIsLinkDeviceToClientModal(false)}
      />
      <Table
        pagination={{
          total: pagination.totalItems,
          current: pagination.currentPage,
          showSizeChanger: false,
          onChange: (p) => goToPage(p)
        }}
        dataSource={items}
      >
        <Column title={'#'} render={(_, __, idx) => idx + 1} />
        <Column
          title={'Code'}
          render={(record) => (
            <Fragment>
              <Avatar icon={<ControlOutlined />} />
              <span style={{ marginLeft: '12px' }}>{record?.code}</span>
            </Fragment>
          )}
        />
        <Column
          title={'Last time active'}
          render={(record, idx) => (
            <Fragment>
              <HistoryOutlined style={{ paddingRight: '12px' }} />
              {new Date(record.lastUpdatedOn).toUTCString()}
            </Fragment>
          )}
        />
        <Column
          title={'Status'}
          render={(record, idx) => (
            <Tag color={getStatusColor(record.status)} key={idx}>
              {record.status}
            </Tag>
          )}
        />
        <Column
          title={'Current Owner'}
          render={(record) =>
            `${record.deviceRentalDetails[0].owner.firstName} ${record.deviceRentalDetails[0].owner.lastName}`
          }
        />
        <Column title={'Cubic meter used'} render={(record) => '300m'} />
        <Column
          title={'Action'}
          render={(record) => (
            <Row style={{ justifyContent: 'space-evenly' }}>
              <EditOutlined
                onClick={() => {
                  setIsLinkDeviceToClientModal(true);
                }}
              />
            </Row>
          )}
        />
      </Table>
    </Fragment>
  );
};

export default DevicesTable;
