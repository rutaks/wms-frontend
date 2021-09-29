import { Menu, Avatar, Breadcrumb, Button, Col, Dropdown, Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  FilePdfOutlined,
  DownloadOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getStatusColor } from '../../util/ui.util';
import TaskDetailsViewModal from '../TaskDetailsViewModal/TaskDetailsViewModal';
import { AssigneePopOver } from '..';
import useGetActiveAgentsPaged from '../../hooks/api/employees/useGetActiveAgentsPaged';
import { taskQueryStrBuilder } from '../../util/query.util';
import useGetEmployees from '../../hooks/api/employees/useGetEmployees';
import useHandleApiState from '../../hooks/useHandleApiState';

const TasksTable = ({
  items = [],
  pagination = {},
  goToPage = () => {},
  onRefresh = () => {},
  isDataTableLoading = false,
  onFilter = () => {}
}) => {
  const getEmployees = useGetEmployees();
  const history = useHistory();
  const [isIssueDetailModalVisible, setIssueDetailModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [availableAgents, setAvailableAgents] = useState([]);
  const getActiveAgentsPaged = useGetActiveAgentsPaged();
  useEffect(() => {
    getActiveAgentsPaged.sendRequest();
    getEmployees.sendRequest({
      query: 'e_._isDeleted=false&e_._employeeRole=FIELD_AGENT',
      page: 1,
      limit: 100
    });
  }, []);

  useHandleApiState(getEmployees, { onSuccess: (res) => setAvailableAgents(res.payload.data) });
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
          type="primary"
          onClick={() => {
            history.push('tasks/new');
          }}
        >
          CREATE TASK
        </Button>
      </Row>
      <br />
      <br />
      <p>
        <b>REPORTS</b>
      </p>
      <Row>
        <Dropdown.Button
          style={{ marginRight: '12px' }}
          overlay={
            <Menu
              onClick={(v) => {
                window.location.href = `http://localhost:5000/tasks/download?${v.key}`;
              }}
            >
              {[
                { key: '', label: 'All' },
                { key: 't_._priority=HIGH', label: 'High' },
                { key: 't_._priority=MEDIUM', label: 'Medium' },
                { key: 't_._priority=LOW', label: 'Low' }
              ].map((i) => (
                <Menu.Item key={i.key} icon={<FilePdfOutlined />}>
                  {i.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomCenter"
          icon={<DownloadOutlined />}
        >
          Download Report by priority
        </Dropdown.Button>
        <Dropdown.Button
          overlay={
            <Menu
              onClick={(v) => {
                window.location.href = `http://localhost:5000/tasks/download?${v.key}`;
              }}
            >
              {[
                { key: '', label: 'All' },
                { key: 't_._status=OPEN', label: 'Open' },
                { key: 't_._status=ONGOING', label: 'Ongoing' },
                { key: 't_._status=REJECTED', label: 'Rejected' }
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
          Download Report by activity status
        </Dropdown.Button>
      </Row>
      <br />
      <TaskDetailsViewModal
        item={selectedItem}
        isModalVisible={isIssueDetailModalVisible}
        onOk={() => setIssueDetailModalVisible(false)}
        onCancel={() => setIssueDetailModalVisible(false)}
      />
      <Spin spinning={isDataTableLoading}>
        <Table
          onChange={(pagination, filters, sorter) => {
            onFilter(taskQueryStrBuilder(sorter, filters));
          }}
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
            key="a_._uuid"
            filters={availableAgents.map((a) => ({ text: `${a.firstName} ${a.lastName}`, value: a.uuid }))}
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
            key="t_._priority"
            title={'Priority'}
            filters={[
              { text: 'High', value: 'HIGH' },
              { text: 'Medium', value: 'MEDIUM' },
              { text: 'Low', value: 'LOW' }
            ]}
            render={(record, idx) => (
              <Tag color={getStatusColor(record.priority)} key={idx}>
                {record.priority}
              </Tag>
            )}
          />
          <Column
            filters={[
              { text: 'Open', value: 'OPEN' },
              { text: 'Assigned', value: 'ASSIGNED' },
              { text: 'Closed', value: 'CLOSED' },
              { text: 'Ongoing', value: 'ONGOING' }
            ]}
            key="t_._status"
            title={'Activity status'}
            render={(record, idx) => <Tag key={idx}>{record.status}</Tag>}
          />
          <Column
            title={'Action'}
            render={(record) => (
              <Row style={{ justifyContent: 'space-evenly' }}>
                <UnorderedListOutlined
                  onClick={() => {
                    //   history.push(`/clients/${record.uuid}`);
                    setSelectedItem(record);
                    setIssueDetailModalVisible(true);
                  }}
                />

                <AssigneePopOver
                  onSuccess={onRefresh}
                  task={record}
                  getActiveAgentsPaged={getActiveAgentsPaged}
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
