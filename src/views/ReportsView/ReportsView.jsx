import React, { Fragment, useState } from 'react';
import { Breadcrumb, Button, Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import AgentsTable from '../../components/AgentsTable/AgentsTable';
import ReportsTable from '../../components/ReportsTable';
import useGetReports from '../../hooks/api/reports/useGetReports';
import { useEffect } from 'react';
import useHandleApiState from '../../hooks/useHandleApiState';

const ReportsView = () => {
  const history = useHistory();
  const getReports = useGetReports();
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  useEffect(() => {
    getReports.sendRequest({ page });
  }, [page]);

  const goToPage = (p) => {
    setPage(p);
  };

  useHandleApiState(getReports, {
    onSuccess: (res) => {
      setReports(res.payload.data);
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
            <Card style={{ paddingLeft: '70px', paddingRight: '70px' }}>
              <Statistic title="Open Issues" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '70px', paddingRight: '70px' }}>
              <Statistic title="Resolved Issues" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '70px', paddingRight: '70px' }}>
              <Statistic title="Unresolved Issues" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '70px', paddingRight: '90px' }}>
              <Statistic title="False Issues" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
        </Row>
        <br />
        <ReportsTable items={reports} pagination={pagination} goToPage={goToPage} />
      </Card>
    </Fragment>
  );
};

export default ReportsView;
