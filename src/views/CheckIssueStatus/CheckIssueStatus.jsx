import React, { Fragment } from 'react';
import { Button, Form, Input, message, Result, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import { UserOutlined } from '@ant-design/icons';
import { getErrorFromUnknown } from '../../util/error.util';
import moment from 'moment';
import { Formik } from 'formik';
import Title from 'antd/lib/typography/Title';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useHandleApiState from '../../hooks/useHandleApiState';
import { useHistory } from 'react-router-dom';
import useGetIssueByTrackingUuId from '../../hooks/api/issues/useGetIssueByTrackingUuId';
import { TaskActivityTimeline } from '../../components';
import { getActivityStatusColor } from '../../util/ui.util';

const CheckIssueStatus = () => {
  const history = useHistory();
  const getIssueByTrackingUuId = useGetIssueByTrackingUuId();

  useHandleApiState(getIssueByTrackingUuId, {
    onError: (error) => {
      message.error(getErrorFromUnknown(error));
    }
  });

  if (getIssueByTrackingUuId.successResponse.payload) {
    return (
      <div style={{ height: '100vh' }}>
        <div style={{ paddingTop: '30vh' }}>
          <Result
            status="success"
            title={`STATUS: ${getIssueByTrackingUuId?.successResponse?.payload?.status}`}
            subTitle={
              <Fragment>
                <Fragment>
                  <p>
                    {`Task was `}
                    <span
                      style={{
                        color: getActivityStatusColor(getIssueByTrackingUuId?.successResponse?.payload.status)
                      }}
                    >
                      <b>{getIssueByTrackingUuId?.successResponse?.payload?.status}</b>
                    </span>
                  </p>
                </Fragment>
                <Text>
                  {moment(new Date(getIssueByTrackingUuId?.successResponse?.payload?.lastViewed)).fromNow()}
                </Text>
              </Fragment>
            }
          />
        </div>
      </div>
    );
  }

  console.log('getIssueByTrackingUuId.successResponse', getIssueByTrackingUuId.successResponse);

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ paddingTop: '30vh', width: '100%' }}>
        <Row justify="center">
          <div style={{ textAlign: 'center' }}>
            <img
              src={window.location.origin + '/img/logo.png'}
              style={{
                height: '120px',
                aspectRatio: 3 / 2
              }}
              alt="Logo"
            />
            <br />
            <Title level={3} className="login-title">
              Check the status of an issue reported
            </Title>
          </div>
        </Row>

        <Row justify="center">
          <Formik
            initialValues={{ trackingUuid: '' }}
            onSubmit={(formData) => {
              getIssueByTrackingUuId.sendRequest({ trackingUuid: formData.trackingUuid });
            }}
          >
            {(formikProps) => {
              return (
                <Form
                  style={{ width: '40%' }}
                  onFinish={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <Form.Item
                    validateStatus={getValidationStatus(formikProps, 'trackingUuid')}
                    help={getHelp(formikProps, 'trackingUuid')}
                  >
                    <Input
                      size="large"
                      name="trackingUuid"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder=""
                      value={formikProps.values.trackingUuid}
                      onChange={formikProps.handleChange('trackingUuid')}
                    />
                  </Form.Item>
                  <Button
                    style={{ marginBottom: '12px' }}
                    block
                    // loading={forgotPassword.isLoading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Check status
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Row>
      </div>
    </div>
  );
};

export default CheckIssueStatus;
