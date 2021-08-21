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

const AgentForm = ({ onSubmit, mode, initialValues, isUploadingImg, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues || clientInitialValues}
      validationSchema={clientValidationSchema}
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
