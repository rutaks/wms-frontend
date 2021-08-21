import React, { Fragment, useState } from 'react';
import {
  PageHeader,
  Button,
  Descriptions,
  Row,
  Statistic,
  Divider,
  Col,
  Select,
  Card,
  List,
  Timeline,
  Tag
} from 'antd';
import { ResponsivePie } from '@nivo/pie';
import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  ControlOutlined,
  ExclamationCircleOutlined,
  DisconnectOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  EditOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Title from 'antd/lib/typography/Title';
import { format } from 'date-fns';
import LinkDeviceToClientModal from '../../components/LinkDeviceToClientModal';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Home'
  },
  {
    path: '/clients',
    breadcrumbName: 'View All Clients'
  },
  {
    path: 'second',
    breadcrumbName: "Client's details"
  }
];

const pieData = [
  {
    id: 'erlang',
    label: 'erlang',
    value: 335,
    color: 'hsl(157, 70%, 50%)'
  },
  {
    id: 'hack',
    label: 'hack',
    value: 172,
    color: 'hsl(174, 70%, 50%)'
  },
  {
    id: 'css',
    label: 'css',
    value: 211,
    color: 'hsl(44, 70%, 50%)'
  },
  {
    id: 'php',
    label: 'php',
    value: 195,
    color: 'hsl(309, 70%, 50%)'
  },
  {
    id: 'java',
    label: 'java',
    value: 255,
    color: 'hsl(181, 70%, 50%)'
  }
];

const usage = [
  { level: 100, date: '2021-08-12T08:17:12.479Z' },
  { level: 90, date: '2021-08-12T08:17:12.479Z' },
  { level: 80, date: '2021-08-12T08:17:12.479Z' },
  { level: 70, date: '2021-08-12T08:17:12.479Z' },
  { level: 20, date: '2021-08-12T08:17:12.479Z' }
];

const Content = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);

const getColorFromLevel = (level) => {
  if (level > 60) {
    return 'blue';
  } else if (level > 40) {
    return 'orange';
  } else {
    return 'red';
  }
};

const getStatusIconFromLevel = (level) => {
  if (level > 60) {
    return <CheckCircleOutlined />;
  } else if (level > 40) {
    return <ExclamationCircleOutlined />;
  } else {
    return <CloseCircleOutlined />;
  }
};

const ClientDetails = () => {
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);
  return (
    <Fragment>
      <Row style={{ paddingTop: '24px', marginInline: '24px' }}>
        <LinkDeviceToClientModal
          isModalVisible={isLinkDeviceToClientModal}
          onOk={() => setIsLinkDeviceToClientModal(false)}
          onCancel={() => setIsLinkDeviceToClientModal(false)}
        />
        <Fragment>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Sam's details"
            subTitle="The details and usages of Sam Rutakayile"
            breadcrumb={{ routes }}
            extra={[
              <Button type="default" style={{ color: '#ffaa00', borderColor: '#ffaa00' }}>
                Edit
              </Button>,
              <Button type="default" danger>
                Remove
              </Button>
            ]}
          >
            <Content
              extra={
                <Row>
                  <Col span={22}>
                    <div
                      style={{
                        display: 'flex',
                        width: 'max-content',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Statistic
                        title="Status"
                        value="Active"
                        valueStyle={{ color: '#3f8600' }}
                        style={{
                          marginRight: 32
                        }}
                      />
                      <Statistic
                        title="Total Usage"
                        prefix={<ArrowUpOutlined />}
                        valueStyle={{ color: '#3498eb' }}
                        suffix="m³"
                        value={12000.08}
                      />
                    </div>
                  </Col>
                  <Col>
                    <br />
                    <Select style={{ width: 120 }}>
                      <Select.Option key={'city'}>{'city'}</Select.Option>
                    </Select>
                  </Col>
                </Row>
              }
            >
              <Divider dashed />
              <Row>
                <Col span={2}>
                  <Avatar
                    style={{ backgroundColor: '#f56a00' }}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 82 }}
                  >
                    RS
                  </Avatar>
                </Col>
                <Col span={22}>
                  <Descriptions size="small" column={4}>
                    <Descriptions.Item label="Full names">Samuel Rutakayile</Descriptions.Item>
                    <Descriptions.Item label="Unique Identifier">
                      <a>1740ef5c-c43c-419d-beac-564b946a8538</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">rutaksam@gmail.com</Descriptions.Item>
                    <Descriptions.Item label="Phone No.">+250782697954</Descriptions.Item>
                    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Divider dashed />
            </Content>
          </PageHeader>
        </Fragment>
      </Row>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <Row>
          <Col span={5}>
            <Title level={3}>Usage Timeline</Title>
            <br />
            <Timeline>
              {usage.map((u) => (
                <Timeline.Item dot={getStatusIconFromLevel(u.level)} color={getColorFromLevel(u.level)}>
                  <b>{u.level} %</b>
                  <br />
                  <span style={{ color: '#b0b0b0' }}>{format(new Date(u.date), 'MM/dd/yyyy HH:mm')}</span>
                </Timeline.Item>
              ))}
            </Timeline>
          </Col>
          <Col span={5}>
            <Title level={3}>User's Devices</Title>
            <Button type="dashed" block onClick={() => setIsLinkDeviceToClientModal(true)}>
              <PlusOutlined />
            </Button>
            <br />
            <br />
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5
              }}
              dataSource={[
                {
                  code: 'ZZZZZ',
                  status: 'ACTIVE',
                  date: '2021-08-12T08:17:12.479Z',
                  location: 'Kigali, Akakaza'
                },
                {
                  code: 'ZZZZZ',
                  status: 'ACTIVE',
                  date: '2021-08-12T08:17:12.479Z',
                  location: 'Kigali, Akakaza'
                },
                {
                  code: 'ZZZZZ',
                  status: 'ACTIVE',
                  date: '2021-08-12T08:17:12.479Z',
                  location: 'Kigali, Akakaza'
                },
                {
                  code: 'ZZZZZ',
                  status: 'ACTIVE',
                  date: '2021-08-12T08:17:12.479Z',
                  location: 'Kigali, Akakaza'
                },
                {
                  code: 'ZZZZZ',
                  status: 'ACTIVE',
                  date: '2021-08-12T08:17:12.479Z',
                  location: 'Kigali, Akakaza'
                }
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag color="green">{item.status}</Tag>,
                    <DisconnectOutlined onClick={() => {}} />,
                    <EditOutlined onClick={() => {}} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<ControlOutlined />} />}
                    title={<b>{item.code} </b>}
                    description={<span style={{ color: '#b0b0b0', fontSize: '12px' }}>{item.location}</span>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={14}>
            <div style={{ height: '500px', width: '100%' }}>
              <ResponsivePie
                data={pieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: 'ruby'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'c'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'go'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'python'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'scala'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'lisp'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'elixir'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'javascript'
                    },
                    id: 'lines'
                  }
                ]}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default ClientDetails;
