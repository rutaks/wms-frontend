import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { Avatar, Col, message, Popover, Row, Select, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useGetActiveAgentsPaged from '../../hooks/api/employees/useGetActiveAgentsPaged';
import { employeeRoles } from '../AgentForm/AgentForm';
import useModifyTask from '../../hooks/api/tasks/useModifyTask';
import useHandleApiState from '../../hooks/useHandleApiState';

const AssigneePopOver = ({ task, getActiveAgentsPaged, onSuccess }) => {
  const modifyTask = useModifyTask();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  useHandleApiState(modifyTask, {
    onSuccess: () => {
      onSuccess();
      setIsPopoverVisible(false);
    },
    onError: (err) => message.error('Could not change assignee')
  });

  return (
    <Popover
      visible={isPopoverVisible}
      content={
        <Fragment>
          <Row>
            <Col>
              <Select
                showSearch={true}
                className="form_item"
                placeholder="Select Agent"
                size="large"
                style={{ width: '100%' }}
                // defaultValue={report.assignee}
                onChange={(uuid) => {
                  modifyTask.sendRequest(task.uuid, 'assignee', { data: { assigneeUuid: uuid } });
                  //   formikProps.setFieldValue('assigneeUuid', uuid);
                }}
                onPopupScroll={(e) => {
                  e.persist();
                  const { target } = e;
                  if (target.scrollTop + target.offsetHeight > target.scrollHeight - 10) {
                    getActiveAgentsPaged.goToNextPage();
                  }
                }}
              >
                {getActiveAgentsPaged.items.map((item, idx) => (
                  <Select.Option value={item.uuid}>
                    <Row>
                      <Col style={{ paddingRight: '12px' }}>
                        <Avatar src={item.profilePictureUrl} />
                      </Col>
                      <Col>
                        <span>{`${item.firstName} ${item.lastName} (${
                          employeeRoles.find((er) => er.value === item.employeeRole).name
                        })`}</span>
                        <br />
                        <span style={{ color: '#c9c9c9' }}>
                          {`Last Active: ${moment(new Date(item.lastUpdatedOn)).fromNow()}`}
                        </span>
                      </Col>
                    </Row>
                  </Select.Option>
                ))}
                {getActiveAgentsPaged.isLoading && (
                  <Select.Option
                    style={{
                      alignItems: 'center',
                      alignContent: 'center',
                      alignSelf: 'center'
                    }}
                    disabled
                    value={0}
                  >
                    <Spin size="small" />
                  </Select.Option>
                )}
              </Select>
            </Col>
          </Row>
        </Fragment>
      }
      title="Title"
      trigger="click"
    >
      <EditOutlined onClick={() => setIsPopoverVisible(true)} />
    </Popover>
  );
};

export default AssigneePopOver;
