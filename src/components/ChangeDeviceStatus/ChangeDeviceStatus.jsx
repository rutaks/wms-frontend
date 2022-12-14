import React, { Fragment } from 'react';
import { Button, Col, Form, InputNumber, message, Row, Select, Switch } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { Formik } from 'formik';
import { SlidersOutlined } from '@ant-design/icons';
import { useSetLocations } from '../../hooks/useLocation';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import {
  linkDeviceToClientInitialValues,
  linkDeviceToClientValidationSchema
} from '../../validations/link-device-to-client.validation';
const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');

const ChangeDeviceStatus = ({ isModalVisible, onOk, onCancel }) => {
  const locationHook = useSetLocations();
  return (
    <Modal
      title="Link a device to client"
      footer={null}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Formik
        initialValues={linkDeviceToClientInitialValues}
        validationSchema={linkDeviceToClientValidationSchema}
        onSubmit={(formikData) => {
          if (!locationHook.village) {
            message.error("Select the device's location");
          }
          console.log(formikData);
        }}
      >
        {(formikProps) => (
          <Fragment>
            <Row>
              <Col span={10}>
                <Text strong>Current Owner:</Text>
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
                <Text strong>Status:</Text>
                <Form.Item name="district">
                  <Switch defaultChecked onChange={() => {}} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" block onSubmit={() => formikProps.handleSubmit()}>
              Modify
            </Button>
          </Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangeDeviceStatus;
