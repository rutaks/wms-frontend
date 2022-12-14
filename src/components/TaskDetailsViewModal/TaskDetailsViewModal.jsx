import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import {
  Form,
  Tag,
  Image,
  Divider,
  Empty,
  Typography,
  Collapse,
  message,
  Row,
  Col,
  Input,
  Button
} from 'antd';
import useGetTaskActivitiesByTask from '../../hooks/api/tasks/useGetTaskActivitiesByTask';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';
import { TaskActivityTimeline, MapView } from '..';
import { getStatusColor } from '../../util/ui.util';
import { Formik } from 'formik';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useAddCommentToTask from '../../hooks/api/tasks/useAddCommentToTask';
import {
  addCommentInitialValues,
  addCommentValidationSchema
} from '../../validations/add-comment.validation';
import { getLoggedInUser } from '../../util/storage.util';

const TaskDetailsViewModal = ({ isModalVisible, onOk, onCancel, onSuccess, item }) => {
  const mapRef = React.useRef();
  const [activities, setActivities] = useState([]);
  const addCommentToTask = useAddCommentToTask();
  const getTaskActivitiesByTask = useGetTaskActivitiesByTask();
  let timer = null;

  useEffect(() => {
    if (item) {
      getTaskActivitiesByTask.sendRequest({ uuid: item.uuid });
    }
  }, [item]);

  useHandleApiState(getTaskActivitiesByTask, {
    onSuccess: (res) => setActivities(res.payload),
    onError: (err) => message.error(`Could not get activities ${getErrorFromUnknown(err)}`)
  });

  useHandleApiState(addCommentToTask, {
    onSuccess: (res) => setActivities((a) => [...a, res.payload]),
    onError: (err) => message.error(`Could add activity, ${getErrorFromUnknown(err)}`)
  });

  console.log('item', item);

  return (
    <Modal
      width={1200}
      title="Task details"
      footer={null}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Row>
        <Col span={22}>
          <Typography.Title level={3}>{item?.title}</Typography.Title>
        </Col>
        <Col span={2}>
          <Tag color={getStatusColor(item?.priority)}>{item?.priority}</Tag>
        </Col>
      </Row>
      <br />
      <b>ReporterDetails</b>
      <br />
      <Typography.Text level={3}>Names: {item?.issue?.reporterNames}</Typography.Text>
      <br />
      <Typography.Text level={3}>Phone Number: {item?.issue?.reporterPhone}</Typography.Text>
      <br />
      <br />
      <b>Description</b>
      <br />
      <Typography.Text level={3}>{item?.description}</Typography.Text>
      <Divider orientation="left">Location details</Divider>
      <p>
        <b>Location Name: </b>
        {item?.locationName}
      </p>
      <br />
      {console.log(item?.locationCoordinates)}
      {item && (
        <MapView
          defaultCoordinates={[
            {
              lat: Number(item?.locationCoordinates?.lat),
              lng: Number(item?.locationCoordinates?.lng)
            }
          ]}
          ref={mapRef}
        />
      )}
      <Divider orientation="left">Task's Pictorial Details</Divider>
      {item?.imgUrls?.length > 0 ? (
        item?.imgUrls?.map((imgUrl) => <Image width={200} src={imgUrl} style={{ paddingRight: '12px' }} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image available" />
      )}
      <Divider orientation="left">
        <span onClick={() => getTaskActivitiesByTask.sendRequest({ uuid: item.uuid })}>Tasks Activities</span>
      </Divider>
      <Collapse>
        <Collapse.Panel header="View all task activities" key="1">
          <TaskActivityTimeline activities={activities} />
        </Collapse.Panel>
      </Collapse>
      <br />
      <Formik
        initialValues={addCommentInitialValues}
        validationSchema={addCommentValidationSchema}
        onSubmit={(formikData) => {
          const userStr = getLoggedInUser();
          if (userStr) {
            const user = JSON.parse(userStr);
            addCommentToTask.sendRequest({
              uuid: item?.uuid,
              data: {
                entityUuid: user.uuid,
                status: item.status,
                value: formikData.description,
                type: 'TEXTUAL_FEEDBACK'
              }
            });
          } else {
            message.error('Could not properly authenticate you, log out and back in');
          }
        }}
      >
        {(formikProps) => (
          <Fragment>
            <h4>Add Comment:</h4>
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
            <Button
              loading={addCommentToTask.isLoading}
              style={{ marginBottom: '12px' }}
              block
              type="primary"
              onClick={() => formikProps.handleSubmit()}
            >
              Add comment
            </Button>
          </Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default TaskDetailsViewModal;
