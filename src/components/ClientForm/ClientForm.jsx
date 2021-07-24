import React, { Fragment } from 'react';
import { Formik } from 'formik';
import Form from 'antd/lib/form';
import { Button, Col, DatePicker, Radio, Row } from 'antd';
import moment from 'moment';
import { clientInitialValues } from '../../validations/client.validation';
import { CustomInput } from '../';
import PhoneNumberInput from '../PhoneNumberInput';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import Text from 'antd/lib/typography/Text';
import Upload from '../Upload';

const ClientForm = () => {
  return (
    <Formik initialValues={clientInitialValues}>
      {(formikProps) => (
        <Fragment>
          <Row>
            <Col lg={4} md={24} sm={24}>
              <Text strong>Profile Picture</Text>
              <Upload />
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
              <Form.Item>
                <Text strong>Gender</Text>
                <Row align="middle">
                  <Radio.Group>
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
              <PhoneNumberInput defaultPhoneNumber={'+250782697954'} />
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
            type="primary"
            onClick={() => formikProps.setFieldValue('firstName', !formikProps.values.generateCode)}
            style={{ fontWeight: 'bold' }}
          >
            SUBMIT
          </Button>
        </Fragment>
      )}
    </Formik>
  );
};

export default ClientForm;
