import { Menu, Avatar, Breadcrumb, Button, Card, Col, Dropdown, Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  FilePdfOutlined,
  DownloadOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IssueDetailsView from '../IssueDetailsViewModal/IssueDetailsViewModal';

const IssuesTable = ({
  items = [],
  pagination = {},
  goToPage = () => {},
  onRefresh = () => {},
  isDataTableLoading = false
}) => {
  const history = useHistory();
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
      <p>
        <b>REPORTS</b>
      </p>
      <Row>
        <Dropdown.Button
          overlay={
            <Menu
              onClick={(v) => {
                window.location.href = `http://localhost:5000/issues/download?${v.key}`;
              }}
            >
              {[
                { key: '', label: 'All' },
                { key: 'i_._status=OPEN', label: 'Open' },
                { key: 'i_._status=ONGOING', label: 'Ongoing' }
              ].map((i) => (
                <Menu.Item key={i.key} icon={<UserOutlined />}>
                  {i.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomCenter"
          icon={<DownloadOutlined />}
        >
          Download Report by status
        </Dropdown.Button>
      </Row>
      <br />
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
                  <SwapOutlined
                    onClick={() => {
                      history.push(`/tasks/new?from_issue=${record.uuid}`);
                    }}
                  />
                )}
                <UnorderedListOutlined
                  onClick={() => {
                    //   history.push(`/clients/${record.uuid}`);
                    setSelectedItem(record);
                    setIssueDetailModalVisible(true);
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

export default IssuesTable;
