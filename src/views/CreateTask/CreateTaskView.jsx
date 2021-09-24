import moment from 'moment';
import { Formik } from 'formik';
import {
  Breadcrumb,
  Card,
  Col,
  Divider,
  PageHeader,
  Select,
  Row,
  Spin,
  Image,
  Form,
  Input,
  Avatar,
  Dropdown,
  Button
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonFileUpload from '../../components/ButtonFileUpload/ButtonFileUpload';
import useGetActiveAgentsPaged from '../../hooks/api/employees/useGetActiveAgentsPaged';
import useGetIssue from '../../hooks/api/issues/useGetIssue';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import {
  raiseIssueInitialValues,
  raiseIssueValidationSchema
} from '../../validations/raise-issue.validation';
import { employeeRoles } from '../../components/AgentForm/AgentForm';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { reportPriority } from '../../components/AssignReportToAgent/AssignReportToAgent';
import CustomMap from '../../components/Maps/CustomMap/CustomMap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateTaskView = () => {
  const uploadRef = React.useRef();
  const history = useHistory();
  const query = useQuery();
  const getIssue = useGetIssue();
  const [foundIssue, setFoundIssue] = useState();
  const [gettingIssue, setGettingIssue] = useState(true);
  const getActiveAgentsPaged = useGetActiveAgentsPaged();

  const mapRef = React.useRef();
  const [locationName, setLocationName] = useState('');
  const locationNameFieldRef = React.useRef();
  const locationCoordinatesFieldRef = React.useRef();
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: '', lng: '' });

  useEffect(() => {
    const issueUuid = query.get('from_issue');
    if (issueUuid) {
      getIssue.sendRequest({ uuid: issueUuid });
      getActiveAgentsPaged.sendRequest();
    } else {
      setGettingIssue(false);
    }
  }, []);

  useHandleApiState(getIssue, {
    onSuccess: (res) => {
      setFoundIssue(res.payload);
      setGettingIssue(false);
    },
    onError: () => {
      setGettingIssue(false);
    }
  });

  if (gettingIssue)
    return (
      <Fragment>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Spin />
      </Fragment>
    );

  return (
    <Col style={{ marginBottom: '12px' }} offset={4} xs={24} sm={16} md={16} lg={16} xl={16}>
      <Row style={{ paddingTop: '24px', marginLeft: '24px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/');
              }}
            >
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/issues');
              }}
            >
              Issues
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>New Issue</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <PageHeader
          onBack={() => history.goBack()}
          title={foundIssue ? `Create task from issue ${foundIssue?.trackingId}` : 'Create New Task'}
          subTitle="Fill in the necessary info"
        />
        <Divider />
        <Formik initialValues={raiseIssueInitialValues} validationSchema={raiseIssueValidationSchema}>
          {(formikProps) => (
            <Fragment>
              <h4>Priority:</h4>
              <br />
              {reportPriority.map((rp) => (
                <CheckableTag
                  style={{ fontSize: '16px' }}
                  key={rp.value}
                  checked={rp.value === formikProps.values?.priority}
                  onChange={(v) => {
                    formikProps.setFieldValue('priority', rp.value);
                  }}
                >
                  {console.log(formikProps.values?.priority)}
                  {console.log(rp)}
                  {rp.name}
                </CheckableTag>
              ))}
              <br />
              <br />
              <h4>Additional images:</h4>
              <ButtonFileUpload style={{ width: '100%', height: '50%' }} maxSize={3} ref={uploadRef} />
              <br />
              <h4>Reporter images:</h4>
              {foundIssue?.imgUrls?.map((imgUrl) => (
                <Image width={200} src={imgUrl} style={{ paddingRight: '12px' }} />
              ))}
              <br />
              <br />
              <h4>Task description:</h4>
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'description')}
                help={getHelp(formikProps, 'description')}
              >
                <Input.TextArea
                  placeholder="..."
                  rows={5}
                  value={formikProps.values.description}
                  onChange={formikProps.handleChange('description')}
                />
              </Form.Item>
              <h4>Assignee:</h4>
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
              <br />
              <b>Choose your location</b>
              <CustomMap
                ref={mapRef}
                locationName={locationName}
                locationNameFieldRef={locationNameFieldRef}
                locationCoordinatesFieldRef={locationCoordinatesFieldRef}
                setLocationName={setLocationName}
                setLocationCoordinates={setLocationCoordinates}
              />
              <br />
              <br />
            </Fragment>
          )}
        </Formik>
      </Card>
    </Col>
  );
};

export default CreateTaskView;
