import React, { Fragment, useState } from 'react';
import { Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { EditOutlined, ControlOutlined, HistoryOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import Avatar from 'antd/lib/avatar/avatar';
import ChangeDeviceStatus from '../ChangeDeviceStatus';
import ModifyDeviceOwnership from '../ModifyDeviceOwnership/ModifyDeviceOwnership';

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

const DevicesTable = ({ items, pagination, goToPage, onRefresh, isDataTableLoading }) => {
  const [device, setDevice] = useState();
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);
  return (
    <Fragment>
      <ModifyDeviceOwnership
        device={device}
        isModalVisible={isLinkDeviceToClientModal}
        onOk={() => {
          onRefresh && onRefresh();
          setIsLinkDeviceToClientModal(false);
        }}
        onCancel={() => setIsLinkDeviceToClientModal(false)}
      />
      <Spin spinning={isDataTableLoading}>
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
            render={(record) => {
              const dr = record.deviceRentalDetails.find((dd) => dd.isActive === true);
              console.log('record.deviceRentalDetails', record.deviceRentalDetails);
              return `${dr.owner.firstName} ${dr.owner.lastName}`;
            }}
          />
          <Column
            title={'Container size'}
            render={(record) => {
              const dr = record.deviceRentalDetails.find((dd) => dd.isActive === true);
              return dr?.containerVolume !== 0 ? dr?.containerVolume : 'N/A';
            }}
          />
          <Column
            title={'Action'}
            render={(record) => (
              <Row style={{ justifyContent: 'space-evenly' }}>
                <EditOutlined
                  onClick={() => {
                    setIsLinkDeviceToClientModal(true);
                    setDevice(record);
                  }}
                />
              </Row>
            )}
          />
        </Table>
      </Spin>
    </Fragment>
  );
};

export default DevicesTable;
