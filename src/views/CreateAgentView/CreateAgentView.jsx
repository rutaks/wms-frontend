import { Breadcrumb, Card, Col, Divider, message, PageHeader, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AgentForm from '../../components/AgentForm';
import useCreateEmployee from '../../hooks/api/employees/useCreateEmployee';
import useHandleApiState from '../../hooks/useHandleApiState';
import { uploadImage } from '../../util/cloudinary.util';
import { getErrorFromUnknown } from '../../util/error.util';

const CreateAgentView = () => {
  const history = useHistory();
  const createEmployee = useCreateEmployee();
  const [isUploading, setIsUploading] = useState(false);
  useHandleApiState(createEmployee, {
    onSuccess: () => {
      message.success('Employee created, he will receive a confirmation email shortly');
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
                history.push('/agents');
              }}
            >
              Employees
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>New Employee</Breadcrumb.Item>
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
          title="Create Employee"
          subTitle="Fill in the necessary info"
        />
        <Divider />
        <AgentForm
          isSubmitting={createEmployee.isLoading || isUploading}
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
            createEmployee.sendRequest({ data: { ...formData, profilePictureUrl: profilePictureUrl?.url } });
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

export default CreateAgentView;
