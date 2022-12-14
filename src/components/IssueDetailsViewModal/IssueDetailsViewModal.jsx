import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Carousel, Descriptions, Divider, Empty, Typography } from 'antd';
const contentStyle = {
  width: '100%',
  color: '#fff',
  // lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};

const IssueDetailsView = ({ isModalVisible, onOk, onCancel, onSuccess, item }) => {
  return (
    <Modal
      width={1200}
      title="Report Info"
      footer={null}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Typography.Title level={3}>{item?.description}</Typography.Title>
      <Divider />
      <Descriptions title="Reporter Info">
        <Descriptions.Item label="Report Names">{item?.reporterNames}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{item?.reporterPhone || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Email">{item?.reporterEmail || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Coordinates">
          <p>{`Lat: ${Math.round(item?.locationCoordinates?.lat, 10)}`}</p>
          <p>{`Lng: ${Math.round(item?.locationCoordinates?.lng, 10)}`}</p>
        </Descriptions.Item>
        <Descriptions.Item label="Address">{item?.locationName}</Descriptions.Item>
      </Descriptions>
      <Divider />
      {item?.imgUrls?.length > 0 ? (
        <Carousel autoplay>
          {item?.imgUrls?.map((img) => (
            <div>
              <img style={{ ...contentStyle, aspectRatio: 3 / 2 }} src={img} alt="" />
            </div>
          ))}
        </Carousel>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image available" />
      )}
    </Modal>
  );
};

export default IssueDetailsView;
