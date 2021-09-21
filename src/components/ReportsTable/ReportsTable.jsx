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

const statuses = ['RESOLVED', 'UNRESOLVED', 'FALSE', 'OPEN'];
const priorities = ['HIGH', 'LOW', 'MEDIUM', 'NONE'];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    description: ' The roof, the roof, the roof is on faya',
    reportedDate: '1997-07-16T19:20+01:00',
    priority: priorities[Math.floor(Math.random() * 3)],
    reportedBy: 'Rutakayile Samuel',
    location: 'NDERA',
    status: statuses[Math.floor(Math.random() * 3)]
  });
}

const getStatusColor = (status) => {
  if (status === 'ASSIGNED') return 'green';
  if (status === 'DISABLED') return 'red';
};

const ReportsTable = ({ items, pagination, goToPage }) => {
  const history = useHistory();
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);
  return (
    <Fragment>
      <AssignReportToAgent
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
          title={'Description'}
          render={(record) => (
            <Fragment>
              <Avatar icon={<ControlOutlined />} />
              <span style={{ marginLeft: '12px' }}>{record?.description}</span>
            </Fragment>
          )}
        />
        <Column
          title={'Reported date'}
          render={(record, idx) => (
            <Fragment>
              <HistoryOutlined style={{ paddingRight: '12px' }} />
              {new Date(record.createdOn).toUTCString()}
            </Fragment>
          )}
        />
        <Column
          title={'Priority'}
          render={(record, idx) => (
            <Tag color={getStatusColor(record.priority)} key={idx}>
              {record.priority}
            </Tag>
          )}
        />
        <Column
          title={'Reported By'}
          render={(record) =>
            `${record.deviceRentalDetails.owner.firstName} ${record.deviceRentalDetails.owner.lastName}`
          }
        />
        <Column title={'Location'} render={(record) => record.deviceRentalDetails?.location?.name} />
        <Column
          title={'Status'}
          render={(record, idx) => (
            <Dropdown.Button
              overlay={
                <Menu onClick={() => {}}>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    1st menu item
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    2nd menu item
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UserOutlined />}>
                    3rd menu item
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
              icon={<UserOutlined />}
            >
              {record.status}
            </Dropdown.Button>
          )}
        />
        <Column
          title={'Action'}
          render={(record) => (
            <Row style={{ justifyContent: 'space-evenly' }}>
              <UnorderedListOutlined
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

export default ReportsTable;
