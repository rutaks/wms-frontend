import { Card, Col, Progress, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import BigCalendar from 'react-big-calendar';
import { ResponsiveCalendar } from '@nivo/calendar';
import moment from 'moment';
import { Brightness7, Brightness3 } from '@mui/icons-material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import useGetTaskCalendar from '../../hooks/api/tasks/useGetTaskCalendar';
import useHandleApiState from '../../hooks/useHandleApiState';
import useGetLineBarData from '../../hooks/api/tasks/useGetLineBarData';
import { subDays } from 'date-fns';
import { formatDateToString } from '../../util/date.util';
import useGetTaskCountByPriority from '../../hooks/api/tasks/useGetTaskCountByPriority';
import { Divider } from '@mui/material';
import { useGetAnalysisByTime } from '../../hooks/api/tasks/useGetAnalysisByTime';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const Overview = () => {
  const [tasks, setTasks] = useState([]);
  const [issuesByTime, setIssuesByTime] = useState();
  const [tasksLineBar, setTasksLineBar] = useState([]);
  const [pieChart, setTasksPieChart] = useState([]);
  const getLineBarData = useGetLineBarData();
  const getTaskCalendar = useGetTaskCalendar();
  const getAnalysisByTime = useGetAnalysisByTime();
  const getTaskCountByPriority = useGetTaskCountByPriority();

  const getPercent = (amount) => {
    const totalIssues =
      issuesByTime?.morningCount ||
      0 + issuesByTime?.afternoonCount ||
      0 + issuesByTime?.eveningCount ||
      0 + issuesByTime?.nightCount ||
      0;

    return (amount * 100) / totalIssues;
  };

  const getItems = () => {
    const columns = [];
    tasksLineBar.forEach((farmer) => {
      const result = farmer.data
        .sort((data1, data2) => new Date(data1.date) - new Date(data2.date))
        .map((res) => {
          const obj = {
            x: formatDateToString(new Date(res.date)),
            y: res.count
          };
          return obj;
        });
      columns.push({
        id: `${farmer.id}`,
        data: result
      });
    });
    return columns;
  };

  useEffect(() => {
    getTaskCountByPriority.sendRequest();
    getLineBarData.sendRequest(subDays(new Date(), 30).toISOString(), new Date().toISOString());
    getTaskCalendar.sendRequest();
    getAnalysisByTime.sendRequest();
  }, []);

  useHandleApiState(getTaskCalendar, { onSuccess: (res) => setTasks(res.payload) });
  useHandleApiState(getLineBarData, { onSuccess: (res) => setTasksLineBar(res.payload) });
  useHandleApiState(getTaskCountByPriority, { onSuccess: (res) => setTasksPieChart(res.payload) });
  useHandleApiState(getAnalysisByTime, { onSuccess: (res) => setIssuesByTime(res.payload) });

  if (getTaskCalendar.isLoading) return null;

  return (
    <Fragment>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <h3>Activity Calendar</h3>
        <BigCalendar
          events={tasks.map((t) => ({ ...t, start: new Date(t.start), end: new Date(t.end) }))}
          step={60}
          view="week"
          views={['week']}
        />
      </Card>
      <Row>
        <Col lg={12}>
          <Card
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              borderRadius: '12px'
            }}
          >
            <h3>Issues per time ranges</h3>
            <Row>
              <Col lg={12}>
                <Brightness7 />
                {' . 6am - 12pm'}
                <Progress percent={getPercent(issuesByTime?.morningCount)} status="active" />
                <br />
                <br />
                <Divider />
                <br />
                <Brightness7 />
                {'  12pm - 6pm'}
                <Progress percent={getPercent(issuesByTime?.afternoonCount)} status="active" />
                <br />
                <br />
              </Col>
              <Col offset={2} lg={10}>
                <Brightness3 />
                {'  6pm - 12am'}
                <Progress percent={getPercent(issuesByTime?.eveningCount)} status="active" />
                <br />
                <br />
                <Divider />
                <br />
                <Brightness3 />
                {'  12am - 6am'}
                <Progress percent={getPercent(issuesByTime?.nightCount)} status="active" />
                <br />
                <br />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div
            style={{
              marginLeft: '12px',
              borderRadius: '12px',
              padding: '12px',
              backgroundColor: '#fff',
              width: '100%',
              height: '500px'
            }}
          >
            <h3>Activity Line Chart</h3>
            <ResponsiveCalendar
              data={[]}
              from="2021-03-01"
              to="2021-07-12"
              emptyColor="#eeeeee"
              colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
                }
              ]}
            />
            <ResponsiveLine
              data={getItems()}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </Col>

        <Col lg={12}>
          <div
            style={{
              marginRight: '12px',
              borderRadius: '12px',
              padding: '12px',
              backgroundColor: '#fff',
              width: '100%',
              height: '500px'
            }}
          >
            <ResponsivePie
              data={Object.keys(pieChart)?.map((l) => ({ id: l, label: l, value: pieChart[l] }))}
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
    </Fragment>
  );
};

export default Overview;
