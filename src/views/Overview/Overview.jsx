import { Card, Col, Row } from 'antd';
import React, { Fragment } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const now = new Date();
const myEventsList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0)
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 13, 12, 0, 0)
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0)
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0)
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0)
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0)
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0)
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0)
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0)
  },
  {
    id: 18,
    title: 'Itaewon Halloween Meeting',
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0)
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0)
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0)
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0)
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0)
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0)
  }
];

const Overview = () => {
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
          events={[
            {
              title: 'My event',
              allDay: false,
              start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
              end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
            },
            {
              title: 'My event 2',
              allDay: false,
              start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
              end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
            }
          ]}
          step={60}
          view="week"
          views={['week']}
          min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
          max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
          date={new Date(2018, 0, 1)}
        />
      </Card>
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
            <ResponsiveLine
              data={[
                {
                  id: 'japan',
                  color: 'hsl(339, 70%, 50%)',
                  data: [
                    {
                      x: 'plane',
                      y: 39
                    },
                    {
                      x: 'helicopter',
                      y: 252
                    },
                    {
                      x: 'boat',
                      y: 191
                    },
                    {
                      x: 'train',
                      y: 266
                    },
                    {
                      x: 'subway',
                      y: 297
                    },
                    {
                      x: 'bus',
                      y: 31
                    },
                    {
                      x: 'car',
                      y: 95
                    },
                    {
                      x: 'moto',
                      y: 197
                    },
                    {
                      x: 'bicycle',
                      y: 23
                    },
                    {
                      x: 'horse',
                      y: 105
                    },
                    {
                      x: 'skateboard',
                      y: 158
                    },
                    {
                      x: 'others',
                      y: 17
                    }
                  ]
                },
                {
                  id: 'france',
                  color: 'hsl(334, 70%, 50%)',
                  data: [
                    {
                      x: 'plane',
                      y: 42
                    },
                    {
                      x: 'helicopter',
                      y: 298
                    },
                    {
                      x: 'boat',
                      y: 240
                    },
                    {
                      x: 'train',
                      y: 175
                    },
                    {
                      x: 'subway',
                      y: 286
                    },
                    {
                      x: 'bus',
                      y: 242
                    },
                    {
                      x: 'car',
                      y: 124
                    },
                    {
                      x: 'moto',
                      y: 94
                    },
                    {
                      x: 'bicycle',
                      y: 139
                    },
                    {
                      x: 'horse',
                      y: 221
                    },
                    {
                      x: 'skateboard',
                      y: 76
                    },
                    {
                      x: 'others',
                      y: 172
                    }
                  ]
                },
                {
                  id: 'us',
                  color: 'hsl(61, 70%, 50%)',
                  data: [
                    {
                      x: 'plane',
                      y: 300
                    },
                    {
                      x: 'helicopter',
                      y: 155
                    },
                    {
                      x: 'boat',
                      y: 218
                    },
                    {
                      x: 'train',
                      y: 279
                    },
                    {
                      x: 'subway',
                      y: 99
                    },
                    {
                      x: 'bus',
                      y: 33
                    },
                    {
                      x: 'car',
                      y: 272
                    },
                    {
                      x: 'moto',
                      y: 192
                    },
                    {
                      x: 'bicycle',
                      y: 190
                    },
                    {
                      x: 'horse',
                      y: 16
                    },
                    {
                      x: 'skateboard',
                      y: 174
                    },
                    {
                      x: 'others',
                      y: 150
                    }
                  ]
                },
                {
                  id: 'germany',
                  color: 'hsl(90, 70%, 50%)',
                  data: [
                    {
                      x: 'plane',
                      y: 110
                    },
                    {
                      x: 'helicopter',
                      y: 85
                    },
                    {
                      x: 'boat',
                      y: 210
                    },
                    {
                      x: 'train',
                      y: 103
                    },
                    {
                      x: 'subway',
                      y: 194
                    },
                    {
                      x: 'bus',
                      y: 261
                    },
                    {
                      x: 'car',
                      y: 284
                    },
                    {
                      x: 'moto',
                      y: 102
                    },
                    {
                      x: 'bicycle',
                      y: 22
                    },
                    {
                      x: 'horse',
                      y: 176
                    },
                    {
                      x: 'skateboard',
                      y: 64
                    },
                    {
                      x: 'others',
                      y: 214
                    }
                  ]
                },
                {
                  id: 'norway',
                  color: 'hsl(89, 70%, 50%)',
                  data: [
                    {
                      x: 'plane',
                      y: 48
                    },
                    {
                      x: 'helicopter',
                      y: 41
                    },
                    {
                      x: 'boat',
                      y: 147
                    },
                    {
                      x: 'train',
                      y: 2
                    },
                    {
                      x: 'subway',
                      y: 72
                    },
                    {
                      x: 'bus',
                      y: 285
                    },
                    {
                      x: 'car',
                      y: 238
                    },
                    {
                      x: 'moto',
                      y: 75
                    },
                    {
                      x: 'bicycle',
                      y: 237
                    },
                    {
                      x: 'horse',
                      y: 201
                    },
                    {
                      x: 'skateboard',
                      y: 281
                    },
                    {
                      x: 'others',
                      y: 161
                    }
                  ]
                }
              ]}
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
              data={[
                {
                  id: 'scala',
                  label: 'scala',
                  value: 167,
                  color: 'hsl(117, 70%, 50%)'
                },
                {
                  id: 'python',
                  label: 'python',
                  value: 394,
                  color: 'hsl(43, 70%, 50%)'
                },
                {
                  id: 'erlang',
                  label: 'erlang',
                  value: 239,
                  color: 'hsl(12, 70%, 50%)'
                },
                {
                  id: 'go',
                  label: 'go',
                  value: 494,
                  color: 'hsl(59, 70%, 50%)'
                },
                {
                  id: 'php',
                  label: 'php',
                  value: 431,
                  color: 'hsl(331, 70%, 50%)'
                }
              ]}
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
