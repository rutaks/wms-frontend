import React, { Fragment, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Avatar, Button, Col, Form, Input, InputNumber, message, Row, Select, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { Formik } from 'formik';
import { useSetLocations } from '../../hooks/useLocation';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import { linkDeviceToClientInitialValues } from '../../validations/link-device-to-client.validation';
import useHandleApiState from '../../hooks/useHandleApiState';
import useModifyOwnership from '../../hooks/api/devices/useModifyOwnership';
import useGetActiveClients from '../../hooks/api/devices/useGetActiveClients';
const { Provinces, Districts, Sectors, Cells, Villages } = require('rwanda');

const ModifyDeviceOwnership = ({ isModalVisible, onOk, onCancel, device }) => {
  const locationHook = useSetLocations();
  const getActiveClients = useGetActiveClients();
  const [activeRentalDetails, setActiveRentalDetails] = useState();
  const modifyOwnership = useModifyOwnership();
  const formikRef = useRef(null);

  useHandleApiState(modifyOwnership, {
    onSuccess: () => {
      message.success('Device re-allocated successfully');
      onOk && onOk();
    },
    onError: () => message.error('An Error occured')
  });

  useEffect(() => {
    getActiveClients.sendRequest();
  }, []);

  useEffect(() => {
    if (device) {
      setActiveRentalDetails(device.deviceRentalDetails.find((dd) => dd.isActive === true));
    }
  }, [device]);

  return (
    <Modal
      title={`Modify ownership of ${device?.code}`}
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
            return;
          }
          const deviceInfo = { ...formikData, locationDto: locationHook.mapLocationHierarchy() };
          // console.log('deviceInfo', deviceInfo);
          modifyOwnership.sendRequest({ code: device?.code, data: deviceInfo });
        }}
      >
        {(formikProps) => (
          <Fragment>
            <h3>
              <b>Current Location:</b>
            </h3>
            <p>
              <i>{activeRentalDetails?.locationCoordinates || 'N/A'}</i>
            </p>
            <h3>
              <b>Current Region:</b>
            </h3>
            <p>
              <i>
                {`${activeRentalDetails?.location?.parent?.parent?.parent?.name} -> ${activeRentalDetails?.location?.parent?.parent?.name} -> ${activeRentalDetails?.location?.parent?.name} -> ${activeRentalDetails?.location?.name}` ||
                  'N/A'}
              </i>
            </p>
            <Row>
              <Col span={24}>
                <Text strong>Client:</Text>
                <Form.Item
                  validateStatus={getValidationStatus(formikProps, 'clientUuid')}
                  help={getHelp(formikProps, 'clientUuid')}
                >
                  <Select
                    showSearch={true}
                    className="form_item"
                    placeholder="Select Owner"
                    size="large"
                    style={{ width: '100%' }}
                    // defaultValue={report.assignee}
                    onChange={(uuid) => {
                      formikProps.setFieldValue('clientUuid', uuid);
                    }}
                    onPopupScroll={(e) => {
                      e.persist();
                      const { target } = e;
                      if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
                        getActiveClients.goToNextPage();
                      }
                    }}
                  >
                    {getActiveClients.items.map((item, idx) => (
                      <Select.Option value={item.uuid}>
                        <Row>
                          <Col style={{ paddingRight: '12px' }}>
                            <Avatar src={item.profilePictureUrl} />
                          </Col>
                          <Col>
                            <span>{`${item.firstName} ${item.lastName}`}</span>
                            <br />
                            <span style={{ color: '#c9c9c9' }}>
                              {`Last Active: ${moment(new Date(item.lastUpdatedOn)).fromNow()}`}
                            </span>
                          </Col>
                        </Row>
                      </Select.Option>
                    ))}
                    {getActiveClients.isLoading && (
                      <Select.Option
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center'
                        }}
                        disabled
                        value={0}
                      >
                        <Spin size="small" />
                      </Select.Option>
                    )}
                  </Select>
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
        loading={modifyOwnership.isLoading}
        block
        onClick={() => formikRef.current?.handleSubmit()}
      >
        LINK
      </Button>
    </Modal>
  );
};

export default ModifyDeviceOwnership;
