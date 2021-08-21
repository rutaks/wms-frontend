import React, { Fragment } from 'react';
import { Button, Col, Form, message, Row, Select, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { Formik } from 'formik';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import {
  linkDeviceToClientInitialValues,
  linkDeviceToClientValidationSchema
} from '../../validations/link-device-to-client.validation';

const options = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10
  });
}

const options2 = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

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

const AssignReportToAgent = ({ isModalVisible, onOk, onCancel }) => {
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
        onSubmit={(formikData) => {}}
      >
        {(formikProps) => (
          <Fragment>
            <Row>
              <Col span={24}>
                <Text strong>Container Cubic meter:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'containerVolume')}
                  help={getHelp(formikProps, 'containerVolume')}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={() => {}}
                    options={options}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text strong>Container Cubic meter:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'containerVolume')}
                  help={getHelp(formikProps, 'containerVolume')}
                >
                  <Select
                    mode="multiple"
                    showArrow
                    tagRender={tagRender}
                    defaultValue={['gold', 'cyan']}
                    style={{ width: '100%' }}
                    options={options}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" block onSubmit={() => formikProps.handleSubmit()}>
              LINK
            </Button>
          </Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default AssignReportToAgent;
