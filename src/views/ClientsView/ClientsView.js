import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useGetClients from '../../hooks/api/clients/useGetClients';
import useHandleApiState from '../../hooks/useHandleApiState';
import ClientsTable from './components/ClientsTable';

const ClientsView = () => {
  const getClients = useGetClients();
  const [clients, setClients] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    getClients.sendRequest({ page });
  }, [page]);

  const goToPage = (p) => {
    setPage(p);
  };

  const refreshPage = (p) => {
    if (p) {
      if (p === page) {
        getClients.sendRequest({ page });
      } else {
        setPage(p);
      }
    } else {
      getClients.sendRequest({ page });
    }
  };

  useHandleApiState(getClients, {
    onSuccess: (res) => {
      setClients(res.payload.data);
      setPagination(res.payload.meta);
    }
  });

  return (
    <ClientsTable
      items={clients}
      pagination={pagination}
      goToPage={goToPage}
      onRefresh={refreshPage}
      isDataTableLoading={getClients.isLoading}
    />
  );
};

export default ClientsView;
