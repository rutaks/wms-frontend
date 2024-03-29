import { Card } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import TasksTable from '../../components/TasksTable';
import useGetTasks from '../../hooks/api/tasks/useGetTasks';
import useHandleApiState from '../../hooks/useHandleApiState';

const TasksView = () => {
  const getTasks = useGetTasks();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  const [queryStr, setQueryStr] = useState();

  const refreshPage = (p) => {
    if (p) {
      if (p === page) {
        getTasks.sendRequest({ page });
      } else {
        setPage(p);
      }
    } else {
      getTasks.sendRequest({ page });
    }
  };

  useEffect(() => {
    getTasks.sendRequest({ query: queryStr, page });
  }, [page, queryStr]);

  const goToPage = (p) => {
    setPage(p);
  };

  useHandleApiState(getTasks, {
    onSuccess: (res) => {
      setTasks(res.payload.data);
      setPagination(res.payload.meta);
    }
  });

  const filter = (query) => setQueryStr(query);

  return (
    <Fragment>
      <Card
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          borderRadius: '12px'
        }}
      >
        <TasksTable
          items={tasks}
          isDataTableLoading={getTasks.isLoading}
          pagination={pagination}
          goToPage={goToPage}
          onRefresh={refreshPage}
          onFilter={filter}
        />
      </Card>
    </Fragment>
  );
};

export default TasksView;
