import React, { Fragment, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Descriptions,
  Row,
  Select,
  Tag,
  Comment,
  Tooltip,
  Avatar,
  Divider,
  Spin,
  message
} from 'antd';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { Formik } from 'formik';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useGetActiveAgentsPaged from '../../hooks/api/employees/useGetActiveAgentsPaged';
import { employeeRoles } from '../AgentForm/AgentForm';
import { modifyReportInitialValues } from '../../validations/modify-report.validation';
import { reportStatuses } from '../ReportsTable/ReportsTable';
import useModifyReport from '../../hooks/api/reports/useModifyReport';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';

const options = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10
  });
}

export const reportPriority = [
  { name: 'High', value: 'HIGH' },
  { name: 'Medium', value: 'MEDIUM' },
  { name: 'Low', value: 'LOW' }
];

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

const AssignReportToAgent = ({ isModalVisible, onOk, onCancel, report }) => {
  const getActiveAgentsPaged = useGetActiveAgentsPaged();
  const modifyReport = useModifyReport();

  useEffect(() => {
    getActiveAgentsPaged.sendRequest();
  }, []);

  useHandleApiState(modifyReport, {
    onSuccess: () => {
      message.success('Report changed successfully');
      onOk();
    },
    onError: (error) => message.error(getErrorFromUnknown(error))
  });

  if (!report) return null;
  return (
    <Modal
      title="Link a device to client"
      footer={null}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Divider>Details</Divider>
      <Descriptions title="" layout="vertical">
        <Descriptions.Item label="Owner Names">{`${report?.deviceRentalDetails.owner?.firstName} ${report?.deviceRentalDetails.owner?.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Owner Email">{`${
          report?.deviceRentalDetails.owner?.email || 'N/A'
        }`}</Descriptions.Item>
        <Descriptions.Item label="Owner Phone No.">{`${
          report?.deviceRentalDetails.owner?.phoneNumber || 'N/A'
        }`}</Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {`${report?.deviceRentalDetails.location.name} (${report?.deviceRentalDetails.location.type}) - ${
            report?.deviceRentalDetails?.locationCoordinates || ''
          }`}
        </Descriptions.Item>
        <Descriptions.Item label="Reported On">{new Date(report?.createdOn).toUTCString()}</Descriptions.Item>
      </Descriptions>
      <h3>
        <b>Report Description:</b>
      </h3>
      <p>
        <i>{report?.description}</i>
      </p>
      <Divider />

      {report.assignee ? (
        <Fragment>
          <h3>
            <b>Reporter:</b>
          </h3>
          <Comment
            author={<a>{`${report?.assignee?.firstName} ${report?.assignee?.lastName}`}</a>}
            avatar={<Avatar src={report?.assignee?.profilePictureUrl} alt={report?.assignee?.firstName} />}
            content={<p>{report?.feedback || ''}</p>}
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(new Date(report.lastUpdatedOn)).fromNow()}</span>
              </Tooltip>
            }
          />
        </Fragment>
      ) : (
        <h3>
          <b>No Reporter assigned</b>
        </h3>
      )}
      <Formik
        enableReinitialize
        initialValues={{
          assigneeUuid: report?.assignee?.uuid || modifyReportInitialValues.assigneeUuid,
          status: report.status || modifyReportInitialValues.status,
          priority: report.priority || modifyReportInitialValues.priority
        }}
        // validationSchema={linkDeviceToClientValidationSchema}
        onSubmit={(formikData) => {
          modifyReport.sendRequest({ uuid: report.uuid, data: formikData });
        }}
      >
        {(formikProps) => (
          <Fragment>
            <Divider>Modify</Divider>
            <Row>
              <Col span={24}>
                <Text strong>Assignee:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'assigneeUuid')}
                  help={getHelp(formikProps, 'assigneeUuid')}
                >
                  <Select
                    showSearch={true}
                    className="form_item"
                    placeholder="Select Agent"
                    size="large"
                    style={{ width: '100%' }}
                    // defaultValue={report.assignee}
                    onChange={(uuid) => {
                      formikProps.setFieldValue('assigneeUuid', uuid);
                    }}
                    onPopupScroll={(e) => {
                      e.persist();
                      const { target } = e;
                      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
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
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text strong>Report Priority:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'priority')}
                  help={getHelp(formikProps, 'priority')}
                >
                  <Select
                    // mode="multiple"
                    showArrow
                    value={formikProps.values.priority}
                    style={{ width: '100%' }}
                    onChange={(p) => formikProps.setFieldValue('priority', p)}
                  >
                    {reportPriority.map((rp) => (
                      <Select.Option value={rp.value}>{rp.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Text strong>Report Status:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'status')}
                  help={getHelp(formikProps, 'status')}
                >
                  <Select
                    showArrow
                    style={{ width: '100%' }}
                    value={formikProps.values.status}
                    onChange={(s) => formikProps.setFieldValue('status', s)}
                  >
                    {reportStatuses.map((rs) => (
                      <Select.Option value={rs.value}>{rs.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" block onClick={() => formikProps.handleSubmit()}>
              LINK
            </Button>
          </Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default AssignReportToAgent;
