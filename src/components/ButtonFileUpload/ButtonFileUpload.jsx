import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react';
import { Button, message, Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const ButtonFileUpload = forwardRef(({ maxSize, style }, ref) => {
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState({ isVisible: false, title: '', image: null });

  useImperativeHandle(ref, () => ({
    getFileList() {
      return fileList;
    }
  }));

  const getBase64 = (img, callback) => callback(URL.createObjectURL(img));

  const handleCancel = () => setPreview((p) => ({ ...p, isVisible: false }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      image: file.url || file.preview,
      isVisible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (maxSize && fileList.length >= maxSize) {
        message.error('Cannot go above max size');
        return;
      }
      setFileList((fl) => [...fl, file]);
      return false;
    },
    fileList
  };

  return (
    <Fragment>
      <Upload
        style={style}
        onPreview={handlePreview}
        maxCount={maxSize}
        listType="picture-card"
        type="drag"
        {...props}
      >
        {fileList.length < maxSize && (
          <Fragment>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to this area to upload</p>
            <p className="ant-upload-hint">You can upload one up to 3 images describing your issue</p>
          </Fragment>
        )}
      </Upload>
      <Modal visible={preview.isVisible} title={preview.title} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={preview.image} />
      </Modal>
    </Fragment>
  );
});

export default ButtonFileUpload;
