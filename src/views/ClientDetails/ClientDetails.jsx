import React, { Fragment, useEffect, useState } from 'react';
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
import useGetClientDetails from '../../hooks/api/clients/useGetClientDetails';
import useHandleApiState from '../../hooks/useHandleApiState';
import { useParams } from 'react-router';
import useGetClientDevices from '../../hooks/api/clients/useGetClientDevices';
import useGetUsageByDeviceAndOwner from '../../hooks/api/clients/useGetUsageByDeviceAndOwner';
import Axios from 'axios';

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

const colors = [
  'hsl(157, 70%, 50%)',
  'hsl(174, 70%, 50%)',
  'hsl(44, 70%, 50%)',
  'hsl(309, 70%, 50%)',
  'hsl(181, 70%, 50%)'
];

const pieData = [
  {
    id: 'AXSS-FF',
    label: 'AXSS-FF',
    value: 335,
    color: 'hsl(157, 70%, 50%)'
  },
  {
    id: 'BDSS-FF',
    label: 'BDSS-FF',
    value: 172,
    color: 'hsl(174, 70%, 50%)'
  },
  {
    id: 'ASDL-FF',
    label: 'ASDL-FF',
    value: 211,
    color: 'hsl(44, 70%, 50%)'
  },
  {
    id: 'VDEF-GG',
    label: 'VDEF-GG',
    value: 195,
    color: 'hsl(309, 70%, 50%)'
  },
  {
    id: 'KFLSS-II',
    label: 'KFLSS-II',
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

export const getColorFromLevel = (level) => {
  if (level > 60) {
    return 'blue';
  } else if (level > 40) {
    return 'orange';
  } else {
    return 'red';
  }
};

export const getStatusIconFromLevel = (level) => {
  if (level > 60) {
    return <CheckCircleOutlined />;
  } else if (level > 40) {
    return <ExclamationCircleOutlined />;
  } else {
    return <CloseCircleOutlined />;
  }
};

const ClientDetails = (props) => {
  let { clientUuid } = useParams();
  const [devicesPage, setDevicesPage] = useState(1);
  const getClientDetails = useGetClientDetails();
  const getClientDevices = useGetClientDevices();
  const getUsageByDeviceAndOwner = useGetUsageByDeviceAndOwner();
  const [clientDetails, setClientDetails] = useState([]);
  const [clientDevices, setClientDevices] = useState({ data: [], meta: {} });
  const [deviceUsages, setDeviceUsages] = useState({ data: [], meta: {} });
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);

  useEffect(() => {
    getClientDevices.sendRequest({ uuid: clientUuid, page: devicesPage });
  }, [devicesPage]);

  useEffect(() => {
    getClientDetails.sendRequest({ uuid: clientUuid });
  }, []);

  useEffect(() => {
    if (clientDevices.data.length > 0) {
      getUsageByDeviceAndOwner.sendRequest({
        ownerUuid: clientUuid,
        deviceCode: clientDevices.data[0]?.code
      });
    }
  }, [clientDevices.data]);

  useHandleApiState(getClientDetails, {
    onSuccess: (res) => {
      setClientDetails(res.payload);
    }
  });

  useHandleApiState(getClientDevices, {
    onSuccess: (res) => {
      setClientDevices(res.payload);
    }
  });

  useHandleApiState(getUsageByDeviceAndOwner, {
    onSuccess: (res) => {
      setDeviceUsages(res.payload);
    }
  });
  return (
    <Fragment>
      <Row style={{ paddingTop: '24px', marginInline: '24px' }}>
        <LinkDeviceToClientModal
          onSuccess={() => {
            setDevicesPage(1);
            getClientDevices.sendRequest({ uuid: clientUuid, page: devicesPage });
            setIsLinkDeviceToClientModal(false);
          }}
          clientUuid={clientUuid}
          isModalVisible={isLinkDeviceToClientModal}
          onOk={() => setIsLinkDeviceToClientModal(false)}
          onCancel={() => setIsLinkDeviceToClientModal(false)}
        />
        <Fragment>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={`${clientDetails.firstName}'s details`}
            subTitle={`The details and usages of ${clientDetails.firstName} ${clientDetails.lastName}`}
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
                      {/* <Statistic
                        title="Total Usage"
                        prefix={<ArrowUpOutlined />}
                        valueStyle={{ color: '#3498eb' }}
                        suffix="m³"
                        value={Math.floor(Math.random() * 10000)}
                      /> */}
                    </div>
                  </Col>
                  {/* <Col>
                    <br />
                    <Select style={{ width: 120 }}>
                      <Select.Option key={'city'}>{'city'}</Select.Option>
                    </Select>
                  </Col> */}
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
                    <Descriptions.Item label="Full names">{`${clientDetails.firstName} ${clientDetails.lastName}`}</Descriptions.Item>
                    <Descriptions.Item label="Unique Identifier">
                      <a>{clientDetails.uuid}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">{clientDetails.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone No.">{clientDetails.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Creation Time">{clientDetails.createdOn}</Descriptions.Item>
                    <Descriptions.Item label="Effective Time">
                      {clientDetails.lastUpdatedOn}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Divider dashed />
              <Button
                block
                type="default"
                onClick={() => {
                  window.location.href = `http://localhost:5000/devices/download?o_._uuid=${clientUuid}`;
                }}
              >
                DOWNLOAD CLIENT'S REPORT
              </Button>
              <br /> <br />
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
            <Title onClick={() => Axios.get('http://localhost:5000/devices/test')} level={3}>
              Usage Timeline ({clientDevices?.data[0]?.code})
            </Title>
            <br />
            <Timeline>
              {deviceUsages.data.map((u) => (
                <Timeline.Item
                  dot={getStatusIconFromLevel(u.levelReached)}
                  color={getColorFromLevel(u.levelReached)}
                >
                  <b>{u.levelReached} %</b>
                  <br />
                  <span style={{ color: '#b0b0b0' }}>
                    {format(new Date(u.createdOn), 'MM/dd/yyyy HH:mm')}
                  </span>
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
                total: clientDevices.meta?.totalItems,
                current: clientDevices.meta?.currentPage,
                showSizeChanger: false,
                onChange: (p) => setDevicesPage(p)
              }}
              dataSource={clientDevices.data.map((cd) => ({
                code: cd.code,
                status: cd.status,
                date: cd.createdOn,
                location: `${cd?.deviceRentalDetails[0]?.location?.name || ''} (${
                  cd?.deviceRentalDetails[0]?.location?.type || ''
                })`
              }))}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag color="green">{item.status}</Tag>
                    // <DisconnectOutlined onClick={() => {}} />,
                    // <EditOutlined onClick={() => {}} />
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
                data={clientDevices.data.map((d) => ({
                  id: d.code,
                  label: d.code,
                  value: d?.deviceRentalDetails[0]?.containerVolume
                }))}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                colors={colors}
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
