import React, { Fragment } from 'react';
import { Formik } from 'formik';
import Form from 'antd/lib/form';
import { Button, Col, DatePicker, Radio, Row } from 'antd';
import moment from 'moment';
import { clientInitialValues, clientValidationSchema } from '../../validations/client.validation';
import { CustomInput } from '..';
import PhoneNumberInput from '../PhoneNumberInput';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import Text from 'antd/lib/typography/Text';
import Upload from '../Upload';

const ClientForm = ({ onSubmit, mode, initialValues, isUploadingImg, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues || clientInitialValues}
      validationSchema={clientValidationSchema}
      onSubmit={(formikData) => {
        onSubmit(formikData);
      }}
    >
      {(formikProps) => (
        <Fragment>
          <Row>
            <Col lg={4} md={24} sm={24}>
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
          </Row>
          <Row>
            <Col flex="auto">
              <CustomInput formikProps={formikProps} fieldName="lastName" label="Last name" />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'gender')}
                help={getHelp(formikProps, 'gender')}
              >
                <Text strong>Gender</Text>
                <Row align="middle">
                  <Radio.Group onChange={(g) => formikProps.setFieldValue('gender', g.target.value)}>
                    <Radio value={'MALE'}>Male</Radio>
                    <Radio value={'FEMALE'}>Female</Radio>
                  </Radio.Group>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <CustomInput formikProps={formikProps} fieldName="email" label="Email" />
            </Col>
            <Col offset={1} flex="auto">
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
            <Col flex="auto">
              <Form.Item
                validateStatus={getValidationStatus(formikProps, 'dob')}
                help={getHelp(formikProps, 'dob')}
              >
                <Text strong>Date of Birth</Text>
                <DatePicker
                  value={formikProps.values.dob && moment(formikProps.values.dob, 'YYYY-MM-DD h:mm:ss a')}
                  onChange={(date) => formikProps.setFieldValue('dob', date.toDate().toISOString())}
                  className="my_input"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
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
        </Fragment>
      )}
    </Formik>
  );
};

export default ClientForm;
