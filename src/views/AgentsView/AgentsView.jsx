import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Menu, Dropdown, Row, Statistic, Table, Tag } from 'antd';
import { FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import AgentsTable from '../../components/AgentsTable/AgentsTable';
import useGetEmployees from '../../hooks/api/employees/useGetEmployees';
import useHandleApiState from '../../hooks/useHandleApiState';

const AgentsView = () => {
  const history = useHistory();
  const getEmployees = useGetEmployees();
  const [agents, setAgents] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  useEffect(() => {
    getEmployees.sendRequest({ page });
  }, [page]);

  const goToPage = (p) => {
    setPage(p);
  };

  useHandleApiState(getEmployees, {
    onSuccess: (res) => {
      setAgents(res.payload.data);
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
        {/* <Row gutter={20} align="middle" style={{ padding: '12px' }}>
          <Col offset={1}>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic title="Active Today" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic title="Unassigned" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic title="Assigned" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
          <Col offset={1}>
            <Card style={{ paddingLeft: '90px', paddingRight: '90px' }}>
              <Statistic title="Disabled" value={100} valueStyle={{ color: '#51befc' }} />
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Button
            block
            type="primary"
            onClick={() => {
              history.push('/employees/new');
            }}
          >
            CREATE EMPLOYEE
          </Button>
          <br />
          <br />
          <p>
            <b>REPORTS</b>
          </p>
          <Button
            block
            type="default"
            onClick={() => {
              window.location.href = `http://localhost:5000/employees/download`;
            }}
          >
            DOWNLOAD REPORT OF ALL EMPLOYEES
          </Button>
          <br />
          <br />
          <Button
            block
            type="default"
            onClick={() => {
              window.location.href = `http://localhost:5000/employees/download/task-count`;
            }}
          >
            DOWNLOAD EMPLOYEES WITH NO. TASKS
          </Button>
          <br />
          <br />
          <Dropdown.Button
            style={{ marginRight: '12px' }}
            overlay={
              <Menu
                onClick={(v) => {
                  window.location.href = `http://localhost:5000/employees/download?${v.key}`;
                }}
              >
                {[
                  { key: 'e_._employeeRole=ADMIN', label: 'All Admins' },
                  { key: 'e_._employeeRole=FIELD_AGENT', label: 'All Field Agents' }
                ].map((i) => (
                  <Menu.Item key={i.key} icon={<FilePdfOutlined />}>
                    {i.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomCenter"
            icon={<DownloadOutlined />}
          >
            Download Employees by role
          </Dropdown.Button>
        </Row>
        <br />
        <AgentsTable items={agents} pagination={pagination} goToPage={goToPage} />
      </Card>
    </Fragment>
  );
};

export default AgentsView;
