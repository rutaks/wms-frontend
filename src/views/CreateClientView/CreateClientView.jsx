import { Breadcrumb, Card, Col, Divider, message, PageHeader, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ClientForm from '../../components/ClientForm';
import useCreateClient from '../../hooks/api/clients/useCreateClient';
import useHandleApiState from '../../hooks/useHandleApiState';
import { uploadImage } from '../../util/cloudinary.util';
import { getErrorFromUnknown } from '../../util/error.util';

const CreateClientView = () => {
  const history = useHistory();
  const [isUploading, setIsUploading] = useState(false);
  const createClient = useCreateClient();
  useHandleApiState(createClient, {
    onSuccess: () => {
      message.success('Client created, he will receive a confirmation email shortly');
      history.goBack();
    },
    onError: (error) => message.error(getErrorFromUnknown(error))
  });

  return (
    <Col style={{ marginBottom: '12px' }} offset={4} xs={24} sm={16} md={16} lg={16} xl={16}>
      <Row style={{ paddingTop: '24px', marginLeft: '24px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/');
              }}
            >
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              onClick={() => {
                history.push('/clients');
              }}
            >
              Client
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create client</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <PageHeader
          onBack={() => history.goBack()}
          title="Create client"
          subTitle="Fill in the necessary info"
        />
        <Divider />
        <ClientForm
          isSubmitting={createClient.isLoading}
          isUploadingImg={isUploading}
          onSubmit={async (formData) => {
            let profilePictureUrl;
            if (formData.profilePictureUrl) {
              try {
                setIsUploading(true);
                profilePictureUrl = await uploadImage(formData.profilePictureUrl);
                setIsUploading(false);
              } catch (error) {
                message.error(error.message);
                setIsUploading(false);
                return;
              }
            }
            createClient.sendRequest({ data: { ...formData, profilePictureUrl: profilePictureUrl?.url } });
          }}
        />
      </Card>
      <br />
      <br />
      <br />
      <br />
    </Col>
  );
};

export default CreateClientView;
