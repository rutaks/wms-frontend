import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Formik } from 'formik';
import Geocode from 'react-geocode';
import { Button, Form, Input, message, Result, Row, Col } from 'antd';
import { CustomInput } from '../../components';
import { usePosition } from 'use-position';
import Title from 'antd/lib/typography/Title';
import { getHelp, getValidationStatus } from '../../util/formik.util';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';
import CustomMap from '../../components/Maps/CustomMap/CustomMap';
import ButtonFileUpload from '../../components/ButtonFileUpload/ButtonFileUpload';
import {
  raiseIssueInitialValues,
  raiseIssueValidationSchema
} from '../../validations/raise-issue.validation';
import { uploadImage } from '../../util/cloudinary.util';
import { backend } from '../../helpers/urlHelper';

const ReportIssue = () => {
  const mapRef = React.useRef();
  const uploadRef = React.useRef();
  const { latitude: autoLat, longitude: autoLng, error } = usePosition();
  const [autoLocationName, setAutoLocationName] = useState();
  const locationNameFieldRef = React.useRef();
  const locationCoordinatesFieldRef = React.useRef();
  const [locationName, setLocationName] = useState('');
  const [isUploadingImgs, setIsUploadingImgs] = useState(false);
  const [isGettingPersonalLocation, setIsGettingPersonalLocation] = useState(true);
  const [isSuccessMessageVisible, setShowSuccessMessage] = useState(false);
  const [locationCoordinates, setLocationCoordinates] = useState({ lat: '', lng: '' });

  useEffect(() => {
    if (autoLat && autoLng && !error) {
      Geocode.setApiKey(backend.googleMapApiKey);
      Geocode.setLanguage('en');
      Geocode.fromLatLng(autoLat, autoLng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setAutoLocationName(address);
          setIsGettingPersonalLocation(false);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [autoLat, autoLng, error]);

  if (isSuccessMessageVisible)
    return (
      <div style={{ height: '100vh' }}>
        <div style={{ paddingTop: '30vh' }}>
          <Result
            status="success"
            title="We have received your report!"
            subTitle={`Thank you, for reporting, your report ticket is ${'FF-FF-122'}. You can use it to check if the issue was resolved`}
          />
        </div>
      </div>
    );

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ paddingTop: '15vh', width: '100%' }}>
        <Row justify="center">
          <div style={{ textAlign: 'center' }}>
            <img
              src={window.location.origin + '/img/logo.png'}
              style={{
                height: '120px',
                aspectRatio: 3 / 2
              }}
              alt="Logo"
            />
            <br />
            <Title level={3} className="login-title">
              Report an issue
            </Title>
          </div>
        </Row>
        <Row justify="center">
          <Formik
            initialValues={raiseIssueInitialValues}
            validationSchema={raiseIssueValidationSchema}
            onSubmit={async (formikData) => {
              const fileList = uploadRef.current.getFileList() || [];
              const issuesImgUrls = [];
              if (fileList.length < 1) {
                message.error('No image(s) were not set');
                return;
              }
              if (!locationCoordinates) {
                message.error('Coordinates missing');
                return;
              }

              if (!locationName) {
                message.error('Location name missing');
                return;
              }

              for (let i = 0; i < fileList.length; i++) {
                setIsUploadingImgs(true);
                const file = fileList[i];
                const imgRes = await uploadImage(file);
                issuesImgUrls.push(imgRes.url);
                setIsUploadingImgs(false);
              }

              const data = { ...formikData, locationCoordinates, locationName, issuesImgUrls };
              console.log('data', data);
            }}
          >
            {(formikProps) => {
              return (
                <Form
                  style={{ width: '40%' }}
                  onFinish={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  <Row>
                    <Col flex="auto">
                      <CustomInput
                        size="large"
                        formikProps={formikProps}
                        fieldName="reporterNames"
                        label="Your full names"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={24} sm={24} md={10} lg={10}>
                      <CustomInput
                        size="large"
                        formikProps={formikProps}
                        fieldName="reporterEmail"
                        label="Your Email"
                      />
                    </Col>
                    <Col offset={2} sm={24} md={12} lg={12}>
                      <CustomInput
                        size="large"
                        formikProps={formikProps}
                        fieldName="reporterPhone"
                        label="Your Phone"
                      />
                    </Col>
                  </Row>
                  <b>Choose your location</b>
                  <CustomMap
                    ref={mapRef}
                    locationName={locationName}
                    locationNameFieldRef={locationNameFieldRef}
                    locationCoordinatesFieldRef={locationCoordinatesFieldRef}
                    setLocationName={setLocationName}
                    setLocationCoordinates={setLocationCoordinates}
                  />
                  <br />
                  <Button
                    style={{ marginBottom: '12px' }}
                    block
                    loading={isGettingPersonalLocation}
                    type="primary"
                    onClick={() => {
                      if (!error) {
                        setLocationCoordinates({ lat: autoLat, lng: autoLng });
                        locationNameFieldRef.current(autoLocationName);
                        message.success(`Co-ordinates lat:${autoLat} long: ${autoLng}`);
                      } else {
                        message.error('Could not get co-ordinates');
                      }
                    }}
                  >
                    Get Current Co-ordinates
                  </Button>
                  <br />
                  <b>Provide description of your issue</b>
                  <Form.Item
                    name="email"
                    validateStatus={getValidationStatus(formikProps, 'description')}
                    help={getHelp(formikProps, 'description')}
                  >
                    <Input.TextArea
                      placeholder="..."
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      value={formikProps.values.description}
                      onChange={formikProps.handleChange('description')}
                    />
                  </Form.Item>
                  <b>Pictures describing event</b>
                  <ButtonFileUpload style={{ width: '100%', height: '50%' }} maxSize={3} ref={uploadRef} />
                  <br />
                  <Button
                    style={{ marginBottom: '12px' }}
                    block
                    loading={isUploadingImgs}
                    type="primary"
                    htmlType="submit"
                  >
                    Report Issue
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Row>
      </div>
    </div>
  );
};

export default ReportIssue;
