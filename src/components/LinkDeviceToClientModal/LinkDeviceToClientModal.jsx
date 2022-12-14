import React, { Fragment, useRef } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Row, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { Formik } from 'formik';
import { useSetLocations } from '../../hooks/useLocation';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import {
  linkDeviceToClientInitialValues,
  linkDeviceToClientValidationSchema
} from '../../validations/link-device-to-client.validation';
import useCreateAndAssignDevice from '../../hooks/api/devices/useCreateAndAssignDevice';
import useHandleApiState from '../../hooks/useHandleApiState';
const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');

const LinkDeviceToClientModal = ({ isModalVisible, onOk, onCancel, onSuccess, clientUuid }) => {
  const locationHook = useSetLocations();
  const createAndAssignDevice = useCreateAndAssignDevice();
  const formikRef = useRef(null);

  useHandleApiState(createAndAssignDevice, {
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => message.error('An Error occured')
  });
  return (
    <Modal
      title="Link a device to client"
      footer={null}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Formik
        innerRef={formikRef}
        initialValues={linkDeviceToClientInitialValues}
        // validationSchema={linkDeviceToClientValidationSchema}
        onSubmit={(formikData) => {
          if (!locationHook.village) {
            message.error("Select the device's location");
          }
          const deviceInfo = { ...formikData, clientUuid, locationDto: locationHook.mapLocationHierarchy() };
          console.log({ ...deviceInfo });
          // createAndAssignDevice.sendRequest({ data: deviceInfo });
        }}
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
                  <InputNumber
                    value={formikProps.values.containerVolume}
                    onChange={(v) => formikProps.setFieldValue('containerVolume', v)}
                    style={{ width: '100%' }}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text strong>Address:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'locationCoordinates')}
                  help={getHelp(formikProps, 'locationCoordinates')}
                >
                  <Input
                    value={formikProps.values.locationCoordinates}
                    onChange={formikProps.handleChange('locationCoordinates')}
                    style={{ width: '100%' }}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Fragment>
        )}
      </Formik>
      <Row>
        <Col span={10}>
          <Text strong>Province:</Text>
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
                console.log('fffff');
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
          <Text strong>District:</Text>
          <Form.Item name="district">
            <Select
              showSearch
              disabled={!locationHook.province}
              value={locationHook?.district}
              className="my_input"
              aria-autocomplete={'none'}
              placeholder="Select district"
              name="district"
              size="large"
              style={{ width: '100%' }}
              onChange={(district) => {
                console.log('district', district);
                locationHook.selectDistrict(district);
              }}
            >
              {Districts(locationHook?.province)?.map((item, idx) => (
                <Select.Option value={item} key={idx}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item name="sector">
            <Text strong>Sector:</Text>
            <Select
              showSearch
              disabled={!locationHook.district}
              value={locationHook?.sector}
              className="my_input"
              aria-autocomplete={'none'}
              placeholder="Select sector"
              name="sector"
              size="large"
              style={{ width: '100%' }}
              onChange={(sector) => {
                console.log('sector', sector);
                locationHook.selectSector(sector);
              }}
            >
              {Sectors(locationHook?.province, locationHook?.district)?.map((item, idx) => (
                <Select.Option value={item} key={idx}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={11} offset={2}>
          <Form.Item name="cell">
            <Text strong>Cell:</Text>
            <Select
              showSearch
              disabled={!locationHook.sector}
              value={locationHook?.cell}
              className="my_input"
              aria-autocomplete={'none'}
              placeholder="Search or select cell"
              name="cell"
              size="large"
              style={{ width: '100%' }}
              onChange={(cell) => {
                console.log('cell', cell);
                locationHook.selectCell(cell);
              }}
            >
              {Cells(locationHook?.province, locationHook?.district, locationHook?.sector)?.map(
                (item, idx) => (
                  <Select.Option value={item} key={idx}>
                    {item}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Form.Item name="village">
            <Text strong>Village:</Text>
            <Select
              showSearch
              disabled={!locationHook.cell}
              value={locationHook?.village}
              className="my_input"
              aria-autocomplete={'none'}
              placeholder="Search or select village"
              name="village"
              size="large"
              style={{ width: '100%' }}
              onChange={(village) => {
                console.log('village', village);
                locationHook.selectVillage(village);
              }}
            >
              {Villages(
                locationHook?.province,
                locationHook?.district,
                locationHook?.sector,
                locationHook?.cell
              )?.map((item, idx) => (
                <Select.Option value={item} key={idx}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <br />
      <Button
        type="primary"
        loading={createAndAssignDevice.isLoading}
        block
        onClick={() => formikRef.current?.handleSubmit()}
      >
        LINK
      </Button>
    </Modal>
  );
};

export default LinkDeviceToClientModal;
