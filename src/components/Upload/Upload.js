import React, { Fragment, useEffect, useState } from 'react';
import UploadImage from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import message from 'antd/lib/message';
import ImgCrop from 'antd-img-crop';
import './Upload.css';

const Upload = ({ setFile, shouldClearImage, imgPlaceholder, crop, aspect }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const getBase64 = (img, callback) => callback(URL.createObjectURL(img));

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(!loading);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
      setFile(info.file.originFileObj);
    }
  };

  useEffect(() => {
    if (shouldClearImage) {
      setImageUrl('');
    }
  }, [shouldClearImage]);

  useEffect(() => {
    if (imgPlaceholder) {
      setImageUrl(imgPlaceholder);
    }
  }, [imgPlaceholder]);

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>;

  const UploadComponent = (
    <UploadImage
      style={{ height: '120px' }}
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl && imageUrl !== '' ? (
        <img src={imageUrl} alt="avatar" style={{ maxHeight: '100%', maxWidth: '100%' }} />
      ) : (
        uploadButton
      )}
    </UploadImage>
  );

  return (
    <Fragment>
      {crop ? (
        <ImgCrop rotate aspect={aspect || 16 / 4} modalWidth={400}>
          {UploadComponent}
        </ImgCrop>
      ) : (
        <Fragment>{UploadComponent}</Fragment>
      )}
    </Fragment>
  );
};
export default Upload;
