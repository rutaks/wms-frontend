import React, { Fragment } from 'react';
import moment from 'moment';
import { Tag, Timeline, Image, Typography, Divider } from 'antd';
import { getActivityStatusColor, getStatusColor } from '../../util/ui.util';

const TaskActivityTimeline = ({ activities }) => {
  return (
    <Timeline>
      {activities?.map((activity) => {
        return (
          <Timeline.Item color="blue">
            {activity.type === 'PICTORIAL_FEEDBACK' && (
              <Fragment>
                <p>
                  <b>{activity?.entity?.firstName}</b>
                  {` uploaded an image ${moment(new Date(activity.occuredOn)).fromNow()} `}
                </p>
                <Image width={200} src={activity?.imgUrl} style={{ borderRadius: '12px' }} />
              </Fragment>
            )}
            {activity.type === 'TEXTUAL_FEEDBACK' && (
              <Fragment>
                <p>
                  <b>{activity?.entity?.firstName}</b>
                  {` added a update message ${moment(new Date(activity.occuredOn)).fromNow()} `}
                </p>
                <b>Comment:</b>
                <br />
                <Typography.Text level={3}>{activity?.description}</Typography.Text>
              </Fragment>
            )}
            {activity.type === 'STATUS_CHANGE' && (
              <Fragment>
                {activity?.status === 'ASSIGNED' ? (
                  <Fragment>
                    <p>
                      {`Task was `}
                      <span style={{ color: getActivityStatusColor(activity.status) }}>
                        <b>{activity?.description}</b>
                      </span>
                      {` to`} <b>{activity?.entity?.firstName}</b>
                    </p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <p>
                      <b>{activity?.entity?.firstName}</b>
                      {` changed the status to `}
                      <span style={{ color: getActivityStatusColor(activity.status) }}>
                        <b>{activity?.description}</b>
                      </span>
                    </p>
                    {activity?.status === 'REJECTED' && (
                      <Fragment>
                        <b>Reason:</b>
                        <br />
                        <Typography.Text level={3}>{activity?.description}</Typography.Text>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
            {activity.type === 'PRIORITY_CHANGE' && (
              <Fragment>
                <p>
                  {`${activity?.entity?.firstName} changed the priority of this task to`}{' '}
                  <Tag color={getStatusColor(activity.priority)}>{activity.priority}</Tag>
                </p>
              </Fragment>
            )}
            <Divider />
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default TaskActivityTimeline;
