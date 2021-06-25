import React, { Fragment, useEffect, useState } from 'react';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { Row } from 'antd';
import parsePhoneNumber from 'libphonenumber-js';
import { countryAreaCodes } from '../../util/country-area-codes';
import { mapIsoCodeToFlag } from '../../util/formatting.util';
import Text from 'antd/lib/typography/Text';

const { Option } = Select;

const PhoneNumberInput = (props) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [country, setCountry] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [nationalPhoneNumber, setNationalPhoneNumber] = useState();

  useEffect(() => {
    if (props.defaultPhoneNumber) {
      const res = parsePhoneNumber(props.defaultPhoneNumber);
      setNationalPhoneNumber(res?.nationalNumber ? res?.nationalNumber?.toString() : '');
      setCountry(res?.country ? res?.country?.toString() : countryAreaCodes[0].code);
      setCallingCode(
        res?.countryCallingCode ? res?.countryCallingCode.toString() : countryAreaCodes[0].phone
      );
      setHasLoaded(true);
    }
  }, [props.defaultPhoneNumber]);

  const onCallingCodeChange = (newCallingCode) => {
    const areaCode = countryAreaCodes.find((countryAreaCode) => countryAreaCode.phone === newCallingCode);
    setCountry(areaCode?.code?.toString() || countryAreaCodes[0].code);
    setCallingCode(areaCode?.phone || countryAreaCodes[0].phone);
  };

  const onNationalPhoneNumberChange = (e) => {
    setNationalPhoneNumber(e.target.value);
  };

  if (!hasLoaded) return null;

  return (
    <Fragment>
      <Col span={4}>
        <Text strong>Phone</Text>
      </Col>
      <Col flex="auto">
        <Row>
          <Col>
            <Select
              defaultValue={`${mapIsoCodeToFlag(country)} (${callingCode}) `}
              onChange={(areaCode) => onCallingCodeChange(areaCode)}
            >
              {countryAreaCodes.sort().map((areaCode, idx) => {
                return (
                  <Option key={idx.toString()} value={areaCode.phone}>
                    {`+${areaCode.phone} ${mapIsoCodeToFlag(areaCode.code)}`}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={15}>
            <Input
              onChange={onNationalPhoneNumberChange}
              style={{ overflow: 'hidden', borderStartStartRadius: '0px', borderEndStartRadius: '0px' }}
              value={nationalPhoneNumber}
              placeholder="Enter Code here"
            />
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
};

export default PhoneNumberInput;
