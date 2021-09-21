import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Col, Row, Statistic } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import DevicesTable from '../../components/DevicesTable';
import useGetDevices from '../../hooks/api/devices/useGetDevices';
import useHandleApiState from '../../hooks/useHandleApiState';

const DevicesView = () => {
  const history = useHistory();
  const getDevices = useGetDevices();
  const [devices, setDevices] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  useEffect(() => {
    getDevices.sendRequest({ page });
  }, [page]);

  const goToPage = (p) => {
    setPage(p);
  };

  useHandleApiState(getDevices, {
    onSuccess: (res) => {
      setDevices(res.payload.data);
      setPagination(res.payload.meta);
    }
  });
  return (
    <Fragment>
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
          <Breadcrumb.Item>Employees</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <Row gutter={20} align="middle" style={{ padding: '12px' }}>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Active Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Inactive Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '140px', paddingRight: '140px' }}>
              <Statistic title="Damaged Devices" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
        </Row>
        <br />
        <DevicesTable items={devices} pagination={pagination} goToPage={goToPage} />
      </Card>
    </Fragment>
  );
};

export default DevicesView;
