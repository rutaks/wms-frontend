import { Card } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import IssuesTable from '../../components/IssuesTable';
import useGetIssues from '../../hooks/api/issues/useGetIssues';
import useHandleApiState from '../../hooks/useHandleApiState';

const IssuesView = () => {
  const getIssues = useGetIssues();
  const [issues, setIssues] = useState([]);
  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  const [queryStr, setQueryStr] = useState();

  useEffect(() => {
    getIssues.sendRequest({ page, query: queryStr });
  }, [page, queryStr]);

  const goToPage = (p) => {
    setPage(p);
  };

  useHandleApiState(getIssues, {
    onSuccess: (res) => {
      setIssues(res.payload.data);
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
        <IssuesTable
          items={issues}
          isDataTableLoading={getIssues.isLoading}
          pagination={pagination}
          goToPage={goToPage}
          onFilter={filter}
        />
      </Card>
    </Fragment>
  );
};

export default IssuesView;
