import { Avatar, Breadcrumb, Button, Card, Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SyncOutlined
} from '@ant-design/icons';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueDetailsView from '../IssueDetailsViewModal/IssueDetailsViewModal';

const mockIssues = [
  {
    description:
      'Recusandae magnam ut. Qui magni architecto dolorum suscipit et. Aliquam porro aliquam reiciendis culpa. Modi ipsam minima voluptates provident fuga officiis. Rerum fuga doloremque maiores consectetur.',
    imgUrls: [
      'http://placeimg.com/640/480/nature',
      'http://placeimg.com/640/480/nature',
      'http://placeimg.com/640/480/nature'
    ],
    locationCoordinates: { lat: '-44.0250', lng: '-122.9898' },
    locationName: '28250 Bartoletti Row',
    reporterEmail: 'Mia.Reilly@hotmail.com',
    reporterNames: 'Cody Jenkins',
    reporterPhone: '797-698-7474 x4608',
    status: 'OPEN',
    id: 19,
    uuid: '67a7ec1d-d0c7-4f33-9f61-95aa126cd6a2'
  }
];

const IssuesTable = ({
  items = [],
  pagination = {},
  goToPage = () => {},
  onRefresh = () => {},
  isDataTableLoading = false
}) => {
  const [isIssueDetailModalVisible, setIssueDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link onClick={() => {}}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Client</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Row>
        <Button
          block
          type="default"
          onClick={() => {
            window.location.href = 'http://localhost:5000/clients/download';
          }}
        >
          DOWNLOAD CLIENT REPORT
        </Button>
        <br />
        <br />
      </Row>
      <IssueDetailsView
        item={selectedItem}
        isModalVisible={isIssueDetailModalVisible}
        onOk={() => setIssueDetailModalVisible(false)}
        onCancel={() => setIssueDetailModalVisible(false)}
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
          <Column title="#" render={(_, __, idx) => idx + 1} />
          <Column
            title="Issue Description"
            render={(record) => `${record?.description.substring(0, 40)}...`}
          />
          <Column
            title="Reported by"
            render={(record) => (
              <Fragment>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: '12px' }}>{record?.reporterNames}</span>
              </Fragment>
            )}
          />
          <Column
            title="Reported Location"
            render={(record) => (
              <Fragment>
                <span style={{ marginLeft: '12px' }}>{record?.locationName}</span>
                <br />
                <span
                  style={{ marginLeft: '12px' }}
                >{`Lat: ${record?.locationCoordinates.lat}, Lng: ${record?.locationCoordinates.lng}`}</span>
              </Fragment>
            )}
          />
          <Column
            title="Reporter contacts"
            render={(record) => (
              <Fragment>
                <span style={{ marginLeft: '12px' }}>Phone: {record?.reporterPhone || 'N/A'}</span>
                <br />
                <span style={{ marginLeft: '12px' }}>Email: {record?.reporterEmail || 'N/A'}</span>
              </Fragment>
            )}
          />
          <Column
            title="Snippets"
            render={(record) => (
              <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {record?.imgUrls.slice(0, 2).map((imgUrl) => {
                  return <Avatar src={imgUrl} />;
                })}
                {record?.imgUrls.slice(2, record?.imgUrls.length).map(() => (
                  <Avatar />
                ))}
              </Avatar.Group>
            )}
          />
          <Column title={'Acc. Status'} render={(record, idx) => <Tag key={idx}>{record.status}</Tag>} />
          <Column
            title={'Action'}
            render={(record) => (
              <Row style={{ justifyContent: 'space-evenly' }}>
                {record.status === 'OPEN' && (
                  <UnorderedListOutlined
                    onClick={() => {
                      //   history.push(`/clients/${record.uuid}`);
                      setSelectedItem(record);
                      setIssueDetailModalVisible(true);
                    }}
                  />
                )}
              </Row>
            )}
          />
        </Table>
      </Spin>
    </Fragment>
  );
};

export default IssuesTable;
