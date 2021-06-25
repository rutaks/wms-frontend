import { Input } from 'antd';
import Form from 'antd/lib/form';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { Fragment } from 'react';
import { getHelp, getValidationStatus } from '../../util/formik.util';

const CustomInput = ({ formikProps, fieldName, label }) => {
  return (
    <Fragment>
      <Text strong>{label}</Text>
      <Form.Item
        style={{ marginTop: '4px' }}
        validateStatus={getValidationStatus(formikProps, fieldName)}
        help={getHelp(formikProps, fieldName)}
      >
        <Input
          style={{ paddingTop: '9px', marginBottom: '9px' }}
          size="small"
          value={formikProps.values[fieldName]}
          onChange={formikProps.handleChange(fieldName)}
        />
      </Form.Item>
    </Fragment>
  );
};

export default CustomInput;
