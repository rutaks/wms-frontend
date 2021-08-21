import React, { Fragment } from 'react';
import { Button, Col, Form, InputNumber, message, Row, Select } from 'antd';
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

const LinkDeviceToClientModal = ({ isModalVisible, onOk, onCancel }) => {
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
              <Col span={24}>
                <Text strong>Container Cubic meter:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'containerVolume')}
                  help={getHelp(formikProps, 'containerVolume')}
                >
                  <InputNumber
                    value={formikProps.values.containerVolume}
                    onChange={formikProps.handleChange('containerVolume')}
                    style={{ width: '100%' }}
                    size="large"
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text strong>Address:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'containerVolume')}
                  help={getHelp(formikProps, 'containerVolume')}
                >
                  <InputNumber
                    value={formikProps.values.containerVolume}
                    onChange={formikProps.handleChange('containerVolume')}
                    style={{ width: '100%' }}
                    size="large"
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
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
                      console.log('onChange', district);
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
            <Row>
              <Col span={20}>
                <Text strong>Address:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'containerVolume')}
                  help={getHelp(formikProps, 'containerVolume')}
                >
                  <InputNumber
                    value={formikProps.values.containerVolume}
                    onChange={formikProps.handleChange('containerVolume')}
                    style={{ width: '100%' }}
                    size="large"
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
              <Col span={2} offset={1} style={{ alignSelf: 'center' }}>
                <Button type="primary" style={{ height: '40px' }} icon={<SlidersOutlined />} />
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

export default LinkDeviceToClientModal;
