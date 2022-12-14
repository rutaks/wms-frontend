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
  Button,
  message
} from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonFileUpload from '../../components/ButtonFileUpload/ButtonFileUpload';
import useGetActiveAgentsPaged from '../../hooks/api/employees/useGetActiveAgentsPaged';
import useGetIssue from '../../hooks/api/issues/useGetIssue';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import { employeeRoles } from '../../components/AgentForm/AgentForm';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { reportPriority } from '../../components/AssignReportToAgent/AssignReportToAgent';
import CustomMap from '../../components/Maps/CustomMap/CustomMap';
import {
  createTaskInitialValues,
  createTaskValidationSchema
} from '../../validations/create-task.validation';
import { CustomInput } from '../../components';
import { uploadImage } from '../../util/cloudinary.util';
import useCreateTask from '../../hooks/api/tasks/useCreateTask';
import { getErrorFromUnknown } from '../../util/error.util';
import Text from 'antd/lib/typography/Text';
import { useSetLocations } from '../../hooks/useLocation';
const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateTaskView = () => {
  const uploadRef = React.useRef();
  const history = useHistory();
  const locationHook = useSetLocations();
  const query = useQuery();
  const formikRef = useRef(null);
  const getIssue = useGetIssue();
  const createTask = useCreateTask();
  const [foundIssue, setFoundIssue] = useState();
  const [isUploadingImages, setIsUploadingImages] = useState();
  const [gettingIssue, setGettingIssue] = useState(true);
  const getActiveAgentsPaged = useGetActiveAgentsPaged();

  const mapRef = React.useRef();
  const [locationName, setLocationName] = useState('');
  const locationNameFieldRef = React.useRef();
  const locationCoordinatesFieldRef = React.useRef();
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: '', lng: '' });

  useEffect(() => {
    const issueUuid = query.get('from_issue');
    getActiveAgentsPaged.sendRequest();
    if (issueUuid) {
      getIssue.sendRequest({ uuid: issueUuid });
    } else {
      setGettingIssue(false);
    }
  }, []);

  useEffect(() => {
    if (mapRef && foundIssue) {
      setLocationCoordinates({
        lat: Number(foundIssue?.locationCoordinates?.lat),
        lng: Number(foundIssue?.locationCoordinates?.lng)
      });
    }
  }, [mapRef, foundIssue]);

  useEffect(() => {
    if (locationNameFieldRef && foundIssue) {
      locationNameFieldRef.current(foundIssue?.locationName);
    }
  }, [locationNameFieldRef, foundIssue]);

  useHandleApiState(createTask, {
    onSuccess: () => {
      history.push('/tasks');
    },
    onError: (err) => message.error(`Could not create task, ${getErrorFromUnknown(err)}`)
  });

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
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            ...createTaskInitialValues.description,
            description: foundIssue?.description || createTaskInitialValues.description
          }}
          validationSchema={createTaskValidationSchema}
          onSubmit={async (formikData) => {
            const fileList = uploadRef.current.getFileList() || [];
            if (!locationHook.village) {
              message.error("Select the device's location");
            }
            const issuesImgUrls = [];
            if (fileList.length < 1) {
              message.error('No image(s) were not set');
              return;
            }
            if (!locationCoordinates) {
              message.error('Coordinates missing');
              return;
            }

            if (!locationName) {
              message.error('Location name missing');
              return;
            }

            for (let i = 0; i < fileList.length; i++) {
              setIsUploadingImages(true);
              const file = fileList[i];
              const imgRes = await uploadImage(file);
              issuesImgUrls.push(imgRes.url);
              setIsUploadingImages(false);
            }
            if (foundIssue?.imgUrls) {
              for (let i = 0; i < foundIssue?.imgUrls?.length; i++) {
                const element = foundIssue?.imgUrls[i];
                issuesImgUrls.push(element);
              }
            }
            const data = {
              ...formikData,
              locationCoordinates,
              locationName,
              imgUrls: issuesImgUrls,
              issueCreatedFromUuid: foundIssue?.uuid,
              locationDto: locationHook.mapLocationHierarchy()
            };

            createTask.sendRequest({ data });
          }}
        >
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
              <CustomInput formikProps={formikProps} fieldName="title" label="Task Title" />
              <h4>Task description:</h4>
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'description')}
                help={getHelp(formikProps, 'description')}
              >
                <Input.TextArea
                  placeholder="..."
                  rows={5}
                  value={formikProps.values.description || ''}
                  onChange={formikProps.handleChange('description')}
                />
              </Form.Item>
              <h4>Assignee:</h4>
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'assigneeUuid')}
                help={getHelp(formikProps, 'assigneeUuid')}
              >
                <Select
                  loading={getActiveAgentsPaged.isLoading}
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
                    console.log(target.scrollTop + target.offsetHeight);
                    console.log(target.scrollHeight - 10);
                    if (target.scrollTop + target.offsetHeight > target.scrollHeight - 10) {
                      console.log('fdsafdsa');
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
                          <b style={{ color: '#c9c9c9' }}>{`Total ongoing tasks: ${item.tasksOngoing}`}</b>
                          <br />
                          <span style={{ color: '#c9c9c9' }}>
                            {`Last Active: ${moment(new Date(item.lastUpdatedOn)).fromNow()}`}
                          </span>
                          <br />
                          <span style={{ color: '#c9c9c9' }}>{`, Phone No: ${item.phoneNumber}`}</span>
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
            </Fragment>
          )}
        </Formik>
        <Fragment>
          <br />
          <h3>Descriptive Location</h3>
          <Row>
            <Col span={10}>
              <Text strong>Province:</Text>
              <Form.Item name="province">
                <Select
                  showSearch
                  value={locationHook.province}
                  className="my_input"
                  aria-autocomplete={'none'}
                  placeholder="Select province"
                  name="province"
                  size="large"
                  onChange={(province) => {
                    console.log('fffff');
                    locationHook.selectProvince(province);
                  }}
                >
                  {Provinces().map((item, idx) => (
                    <Select.Option value={item} key={idx}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Text strong>District:</Text>
              <Form.Item name="district">
                <Select
                  showSearch
                  disabled={!locationHook.province}
                  value={locationHook?.district}
                  className="my_input"
                  aria-autocomplete={'none'}
                  placeholder="Select district"
                  name="district"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(district) => {
                    console.log('district', district);
                    locationHook.selectDistrict(district);
                  }}
                >
                  {Districts(locationHook?.province)?.map((item, idx) => (
                    <Select.Option value={item} key={idx}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name="sector">
                <Text strong>Sector:</Text>
                <Select
                  showSearch
                  disabled={!locationHook.district}
                  value={locationHook?.sector}
                  className="my_input"
                  aria-autocomplete={'none'}
                  placeholder="Select sector"
                  name="sector"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(sector) => {
                    console.log('sector', sector);
                    locationHook.selectSector(sector);
                  }}
                >
                  {Sectors(locationHook?.province, locationHook?.district)?.map((item, idx) => (
                    <Select.Option value={item} key={idx}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              <Form.Item name="cell">
                <Text strong>Cell:</Text>
                <Select
                  showSearch
                  disabled={!locationHook.sector}
                  value={locationHook?.cell}
                  className="my_input"
                  aria-autocomplete={'none'}
                  placeholder="Search or select cell"
                  name="cell"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(cell) => {
                    console.log('cell', cell);
                    locationHook.selectCell(cell);
                  }}
                >
                  {Cells(locationHook?.province, locationHook?.district, locationHook?.sector)?.map(
                    (item, idx) => (
                      <Select.Option value={item} key={idx}>
                        {item}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name="village">
                <Text strong>Village:</Text>
                <Select
                  showSearch
                  disabled={!locationHook.cell}
                  value={locationHook?.village}
                  className="my_input"
                  aria-autocomplete={'none'}
                  placeholder="Search or select village"
                  name="village"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(village) => {
                    console.log('village', village);
                    locationHook.selectVillage(village);
                  }}
                >
                  {Villages(
                    locationHook?.province,
                    locationHook?.district,
                    locationHook?.sector,
                    locationHook?.cell
                  )?.map((item, idx) => (
                    <Select.Option value={item} key={idx}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <br />
          <br />
          <Button
            style={{ marginBottom: '12px' }}
            block
            loading={isUploadingImages || createTask.isLoading}
            type="primary"
            onClick={() => formikRef.current?.handleSubmit()}
          >
            Create task
          </Button>
        </Fragment>
      </Card>
    </Col>
  );
};

export default CreateTaskView;
