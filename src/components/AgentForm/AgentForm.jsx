import React, { Fragment } from 'react';
import { Formik } from 'formik';
import Form from 'antd/lib/form';
import { Button, Col, Select, Row } from 'antd';
import { CustomInput } from '..';
import PhoneNumberInput from '../PhoneNumberInput';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import Text from 'antd/lib/typography/Text';
import Upload from '../Upload';
import { employeeInitialValues, employeeValidationSchema } from '../../validations/employee.validation';

const AgentForm = ({ onSubmit, mode, initialValues, isUploadingImg, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues || employeeInitialValues}
      validationSchema={employeeValidationSchema}
      onSubmit={(formikData) => {
        onSubmit(formikData);
      }}
    >
      {(formikProps) => (
        <div style={{ paddingInline: '200px', paddingBottom: '120px' }}>
          <Row>
            <Col lg={24} md={24} sm={24}>
              <Text strong>Profile Picture</Text>
              <Upload
                crop
                isLoading={isUploadingImg}
                setFile={(f) => formikProps.setFieldValue('profilePictureUrl', f)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col flex="auto">
              <CustomInput formikProps={formikProps} fieldName="firstName" label="First name" />
            </Col>
            <Col offset={1} flex="auto">
              <CustomInput formikProps={formikProps} fieldName="lastName" label="Last name" />
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <CustomInput formikProps={formikProps} fieldName="email" label="Email" />
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'phoneNumber')}
                help={getHelp(formikProps, 'phoneNumber')}
              >
                <PhoneNumberInput
                  label="Phone number"
                  defaultPhoneNumber={formikProps?.values?.phoneNumber}
                  onChange={(p) => {
                    console.log(p);
                    formikProps.setFieldValue('phoneNumber', `+${p}`);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              name="employeeRole"
              validateStatus={getValidationStatus(formikProps, 'employeeRole')}
              help={getHelp(formikProps, 'employeeRole')}
            >
              <Text strong>Role:</Text>
              <Col flex="auto">
                <Select
                  value={formikProps?.values?.employeeRole}
                  placeholder="Give new employee a role"
                  name="employeeRole"
                  size="large"
                  style={{ width: '100%' }}
                  onChange={(role) => {
                    formikProps.setFieldValue('employeeRole', role);
                  }}
                >
                  {[
                    { name: 'Administrator', value: 'ADMIN' },
                    { name: 'Field Agent', value: 'FIELD_AGENT' }
                  ]?.map((item, idx) => (
                    <Select.Option value={item.value} key={idx}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Form.Item>
          </Row>
          <Button
            block
            type={mode === 'EDIT' ? 'warning' : 'primary'}
            onClick={() => formikProps.handleSubmit()}
            style={{ fontWeight: 'bold' }}
            loading={isSubmitting}
          >
            SUBMIT
          </Button>
        </div>
      )}
    </Formik>
  );
};

export default AgentForm;
