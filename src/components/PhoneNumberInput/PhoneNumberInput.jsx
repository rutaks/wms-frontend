import React, { Fragment, useEffect, useState } from 'react';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Text from 'antd/lib/typography/Text';
import { countryAreaCodes } from '../../util/country-area-codes';
import { mapIsoCodeToFlag } from '../../util/formatting.util';
import parsePhoneNumber from 'libphonenumber-js';
import { Row } from 'antd';

const { Option } = Select;

const PhoneNumberInput = ({ onChange, defaultPhoneNumber, label, placeholder }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [country, setCountry] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [nationalPhoneNumber, setNationalPhoneNumber] = useState();

  useEffect(() => {
    if (defaultPhoneNumber && defaultPhoneNumber !== '') {
      const res = parsePhoneNumber(defaultPhoneNumber);
      setNationalPhoneNumber(res?.nationalNumber ? res?.nationalNumber?.toString() : '');
      setCountry(res?.country ? res?.country?.toString() : countryAreaCodes[0].code);
      setCallingCode(
        res?.countryCallingCode ? res?.countryCallingCode.toString() : countryAreaCodes[0].phone
      );
      setHasLoaded(true);
    } else {
      setCountry(countryAreaCodes[0].code);
      setCallingCode(countryAreaCodes[0].phone);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(`${callingCode}${nationalPhoneNumber || ''}`);
    }
  }, [callingCode, nationalPhoneNumber]);

  const onCallingCodeChange = (newCallingCode) => {
    const areaCode = countryAreaCodes.find((countryAreaCode) => countryAreaCode.phone === newCallingCode);
    setCountry(areaCode?.code?.toString() || countryAreaCodes[0].code);
    setCallingCode(areaCode?.phone || countryAreaCodes[0].phone);
  };

  const onNationalPhoneNumberChange = (e) => {
    setNationalPhoneNumber(e.target.value);
  };

  const CountryCodeSelector = (
    <Select
      showSearch
      value={`+${callingCode} ${mapIsoCodeToFlag(country)}`}
      defaultValue={`+${callingCode} ${mapIsoCodeToFlag(country)}`}
      onChange={(areaCode) => onCallingCodeChange(areaCode)}
      bordered={false}
      style={{ color: '#000000', fontWeight: 700 }}
    >
      {countryAreaCodes
        .sort((a, b) => parseInt(a.phone.replace('-', '')) - parseInt(b.phone.replace('-', '')))
        .map((areaCode, idx) => {
          return (
            <Option key={idx.toString()} value={areaCode.phone}>
              {`+${areaCode.phone} ${mapIsoCodeToFlag(areaCode.code)}`}
            </Option>
          );
        })}
    </Select>
  );
  if (!hasLoaded) return null;
  return (
    <Fragment>
      {label && (
        <Col style={{ paddingBottom: '4px' }}>
          <Text strong>{label}</Text>
        </Col>
      )}
      <Col flex="auto">
        <Row>
          <Col span={24}>
            <Input
              onChange={onNationalPhoneNumberChange}
              style={{ overflow: 'hidden' }}
              value={nationalPhoneNumber}
              placeholder={placeholder}
              prefix={CountryCodeSelector}
            />
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
};
export default PhoneNumberInput;
