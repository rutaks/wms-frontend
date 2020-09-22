import { Row } from 'antd';
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

/**
 * Component representing a loading view
 * @author Rutakayile Samuel
 * @version 1.0
 */
export default function LoadingLayout() {
  return (
    <Row style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <div style={{ margin: 'auto' }}>
        <Spin indicator={antIcon} />
      </div>
    </Row>
  );
}
