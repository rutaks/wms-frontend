import React, { Fragment, useState } from 'react';
import { Dropdown, Menu, Row, Spin, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import {
  CaretRightOutlined,
  DownCircleOutlined,
  UnorderedListOutlined,
  ControlOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import AssignReportToAgent from '../AssignReportToAgent/AssignReportToAgent';
import useModifyReport from '../../hooks/api/reports/useModifyReport';
import useHandleApiState from '../../hooks/useHandleApiState';
import { getErrorFromUnknown } from '../../util/error.util';

const getStatusColor = (status) => {
  if (status === 'HIGH') return 'red';
  if (status === 'MEDIUM') return 'gold';
  if (status === 'LOW') return 'green';
};

export const reportStatuses = [
  { name: 'Open', value: 'OPEN' },
  { name: 'Resolved', value: 'RESOLVED' },
  { name: 'Fake Report', value: 'FAKE_REPORT' }
];

const ReportsTable = ({ items, pagination, goToPage, onRefresh, isDataTableLoading }) => {
  const modifyReport = useModifyReport();
  const [selectedReport, setSelectedReport] = useState();
  const [isLinkDeviceToClientModal, setIsLinkDeviceToClientModal] = useState(false);

  useHandleApiState(modifyReport, {
    onSuccess: () => {
      onRefresh();
    },
    onError: (error) => getErrorFromUnknown(error)
  });

  return (
    <Fragment>
      <AssignReportToAgent
        isModalVisible={isLinkDeviceToClientModal}
        report={selectedReport}
        onOk={() => {
          setIsLinkDeviceToClientModal(false);
          onRefresh();
        }}
        onCancel={() => setIsLinkDeviceToClientModal(false)}
      />
      <Spin spinning={isDataTableLoading}>
        <Table
          pagination={{
            total: pagination.totalItems,
            current: pagination.currentPage,
            showSizeChanger: false,
            onChange: (p) => goToPage(p)
          }}
          dataSource={items}
        >
          <Column title={'#'} render={(_, __, idx) => idx + 1} />
          <Column
            title={'Description'}
            render={(record) => (
              <Fragment>
                <Avatar icon={<ControlOutlined />} />
                <span style={{ marginLeft: '12px' }}>{record?.description}</span>
              </Fragment>
            )}
          />
          <Column
            title={'Reported date'}
            render={(record, idx) => (
              <Fragment>
                <HistoryOutlined style={{ paddingRight: '12px' }} />
                {new Date(record.createdOn).toUTCString()}
              </Fragment>
            )}
          />
          <Column
            title={'Priority'}
            render={(record, idx) => (
              <Tag color={getStatusColor(record.priority)} key={idx}>
                {record.priority}
              </Tag>
            )}
          />
          <Column
            title={'Reported By'}
            render={(record) =>
              `${record.deviceRentalDetails.owner.firstName} ${record.deviceRentalDetails.owner.lastName}`
            }
          />
          <Column title={'Location'} render={(record) => record.deviceRentalDetails?.location?.name} />
          <Column
            title={'Status'}
            render={(record, idx) => (
              <Dropdown.Button
                overlay={
                  <Menu onClick={() => {}}>
                    {reportStatuses.map((v) => (
                      <Menu.Item
                        key={v.value}
                        icon={<CaretRightOutlined />}
                        onClick={() => {
                          console.log('CLICKED');
                          if (v.value !== record.status) {
                            modifyReport.sendRequest({
                              uuid: record.uuid,
                              data: { status: v.value, priority: record.priority }
                            });
                          }
                        }}
                      >
                        {v.name} {v.value === record.status && '<<'}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomCenter"
                icon={<DownCircleOutlined />}
              >
                {reportStatuses.find((r) => r.value === record.status).name}
              </Dropdown.Button>
            )}
          />
          <Column
            title={'Action'}
            render={(record) => (
              <Row style={{ justifyContent: 'space-evenly' }}>
                <UnorderedListOutlined
                  onClick={() => {
                    setSelectedReport(record);
                    setIsLinkDeviceToClientModal(true);
                  }}
                />
              </Row>
            )}
          />
        </Table>
      </Spin>
    </Fragment>
  );
};

export default ReportsTable;
