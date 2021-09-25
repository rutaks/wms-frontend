import { Avatar, Breadcrumb, Button, Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { SwapOutlined, UnorderedListOutlined } from '@ant-design/icons';
import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getStatusColor } from '../../util/ui.util';
import TaskDetailsViewModal from '../TaskDetailsViewModal/TaskDetailsViewModal';

const TasksTable = ({
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
      <TaskDetailsViewModal
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
          <Column title="Title" render={(record) => `${record?.title}`} />
          <Column
            title="Assigned"
            render={(record) => (
              <Fragment>
                <Avatar src={record?.assignee.profilePictureUrl} />
                <span
                  style={{ marginLeft: '12px' }}
                >{`${record?.assignee?.firstName} ${record?.assignee?.lastName}`}</span>
              </Fragment>
            )}
          />
          <Column
            title="Location"
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
          <Column
            title={'Priority'}
            render={(record, idx) => (
              <Tag color={getStatusColor(record.priority)} key={idx}>
                {record.priority}
              </Tag>
            )}
          />
          <Column title={'Activity status'} render={(record, idx) => <Tag key={idx}>{record.status}</Tag>} />
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

export default TasksTable;
