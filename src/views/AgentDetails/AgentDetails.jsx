import { ResponsivePie } from '@nivo/pie';
import {
  Tag,
  Avatar,
  Image,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  message,
  PageHeader,
  Row,
  List,
  Typography
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useGetEmployee from '../../hooks/api/employees/useGetEmployee';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';
import useGetTaskActivites from '../../hooks/api/tasks/useGetTaskActivites';
import { getActivityStatusColor, getStatusColor } from '../../util/ui.util';
import useAgentActivityCount from '../../hooks/api/tasks/useAgentActivityCount';

const colors = [
  'hsl(157, 70%, 50%)',
  'hsl(174, 70%, 50%)',
  'hsl(44, 70%, 50%)',
  'hsl(309, 70%, 50%)',
  'hsl(181, 70%, 50%)'
];

const AgentDetails = () => {
  let { uuid } = useParams();
  const getAgent = useGetEmployee();
  const [agent, setAgent] = useState();
  const [devicesPage, setDevicesPage] = useState(1);
  const getTaskActivites = useGetTaskActivites();
  const agentActivityCount = useAgentActivityCount();
  const [agentActivities, setAgentActivities] = useState([]);

  useEffect(() => {
    getAgent.sendRequest({ uuid });
  }, []);

  useEffect(() => {
    getTaskActivites.sendRequest({ query: `d_._uuid=${uuid}`, page: devicesPage });
    agentActivityCount.sendRequest({ uuid });
  }, [devicesPage]);

  useHandleApiState(getAgent, {
    onSuccess: (res) => setAgent(res.payload),
    onError: (err) => message.error(getErrorFromUnknown(err))
  });

  useHandleApiState(getTaskActivites, {
    onSuccess: (res) => setAgentActivities(res.payload),
    onError: (err) => message.error(getErrorFromUnknown(err))
  });

  return (
    <Fragment>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={`${agent?.lastName}'s details`}
        subTitle={`The details and usages of ${agent?.lastName}`}
      >
        <Content>
          <Divider dashed />
          <Row>
            <Col span={2}>
              <Avatar
                style={{ backgroundColor: '#f56a00' }}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 82 }}
              >
                {`${agent?.firstName[0]} ${agent?.lastName[0]}`}
              </Avatar>
            </Col>
            <Col span={22}>
              <Descriptions size="small" column={4}>
                <Descriptions.Item label="Full names">{`${agent?.firstName} ${agent?.lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Unique Identifier">
                  <a>{agent?.uuid}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Email">{agent?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone No.">{agent?.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Creation Time">{agent?.createdOn}</Descriptions.Item>
                <Descriptions.Item label="Effective Time">{agent?.lastUpdatedOn}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
          <Divider dashed />
          <Button
            block
            type="default"
            onClick={() => {
              window.location.href = `http://localhost:5000/devices/download?o_._uuid=`;
            }}
          >
            DOWNLOAD AGENT'S REPORT
          </Button>
          <br /> <br />
        </Content>
      </PageHeader>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <Row>
          <Col span={10}>
            <br />
            <br />
            <List
              itemLayout="horizontal"
              pagination={{
                total: agentActivities.meta?.totalItems,
                current: agentActivities.meta?.currentPage,
                showSizeChanger: false,
                onChange: (p) => setDevicesPage(p)
              }}
              dataSource={agentActivities.data}
              renderItem={(item) => (
                <List.Item actions={[<Tag color="green">{item.task.status}</Tag>]}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ClockCircleOutlined />} />}
                    title={
                      <Fragment>
                        {item.type === 'PICTORIAL_FEEDBACK' && (
                          <Fragment>
                            Agent uploaded an image report
                            <br />
                            <br />
                            <b>TASK: {item.task.title}</b>
                            <br />
                            <i>Location: {item?.task?.locationName}</i>
                            <br />
                            <Image width={200} src={item?.value} style={{ borderRadius: '12px' }} />
                          </Fragment>
                        )}
                        {item.type === 'TEXTUAL_FEEDBACK' && (
                          <Fragment>
                            <p>
                              <b>{item?.doneBy?.firstName}</b>
                              {` added a update message`}
                            </p>
                            <b>TASK: {item.task.title}</b>
                            <br />
                            <i>Location: {item?.task?.locationName}</i>
                            <br />
                            <br />
                            <b>Comment:</b>
                            <br />
                            <Typography.Text level={3}>{item?.value}</Typography.Text>
                          </Fragment>
                        )}
                        {item.type === 'STATUS_CHANGE' && (
                          <Fragment>
                            {item?.status === 'ASSIGNED' ? (
                              <Fragment>
                                <p>
                                  {`Task was `}
                                  <span style={{ color: getActivityStatusColor(item.status) }}>
                                    <b>{item?.value}</b>
                                  </span>
                                  {` to`} <b>{item?.doneBy?.firstName}</b>
                                </p>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <p>
                                  <b>{`${item?.doneBy?.firstName} ${item?.doneBy?.lastName}`}</b>
                                  {` changed the status to `}
                                  <span style={{ color: getActivityStatusColor(item.status) }}>
                                    <b>{item?.status}</b>
                                  </span>
                                </p>
                                {item?.status === 'REJECTED' && (
                                  <Fragment>
                                    <b>Reason:</b>
                                    <br />
                                    <Typography.Text level={3}>{item?.value}</Typography.Text>
                                  </Fragment>
                                )}
                              </Fragment>
                            )}
                            <b>TASK: {item.task.title}</b>
                            <br />
                            <i>Location: {item?.task?.locationName}</i>
                            <br />
                            <br />
                          </Fragment>
                        )}
                        {item.type === 'PRIORITY_CHANGE' && (
                          <Fragment>
                            <p>
                              {`${item?.doneBy?.firstName} changed the priority of this task to`}
                              <Tag color={getStatusColor(item.value)}> {item.value}</Tag>
                            </p>
                          </Fragment>
                        )}
                      </Fragment>
                    }
                    description={<span style={{ color: '#b0b0b0', fontSize: '12px' }}>{item.createdOn}</span>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={14}>
            <div style={{ height: '500px', width: '100%' }}>
              <ResponsivePie
                data={
                  Object?.keys(agentActivityCount?.successResponse?.payload || {})?.map((v) => ({
                    id: v,
                    label: v,
                    value: agentActivityCount?.successResponse?.payload[v]
                  })) || []
                }
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                // colors={colors}
                fill={[
                  {
                    match: {
                      id: 'ongoing'
                    },
                    id: 'dots'
                  }
                ]}
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

export default AgentDetails;
