import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../context/Api';

/**
 * Hook to process api get requests in a paginated manner
 * will handle state management of request while request is being made
 * @author Awesomity Lab
 * @version 1.0
 */
const usePaginatedQuery = () => {
  /** Api request states */
  const api = useApi(); // api context value
  const [query, setQuery] = useState(); // query hook
  const [error, setError] = useState(); // on error hook
  const [page, setPage] = useState(1); // page hook used for paging requests
  const [isLoading, setIsLoading] = useState(false); // on loading hook
  const [canFetch, setCanFetch] = useState(false); // hook to set if api can fetch more data
  const [isLoadingMore, setIsLoadingMore] = useState(false); // hook when api loading more data
  const [hasReachedEnd, setHasReachedEnd] = useState(false); // hook when no more data is available
  const [items, setItems] = useState([]); // hook for array of items/data retrieved
  const [meta, setMeta] = useState({
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 1
  }); // hook for api pagination metadata

  const handleRequest = (q) => {
    console.log('q', q);
    setPage(0);
    setQuery(q);
    setCanFetch(true);
    fetchData({ handleLoading: setIsLoading, pageNo: 0, q });
  };

  /**
   * Increments page hook state to go to next of the api
   */
  const goToNextPage = () => {
    if (canFetch) {
      setPage((p) => {
        fetchData({ handleLoading: setIsLoadingMore, pageNo: p + 1 });
        return p + 1;
      });
    }
  };

  /**
   * Resets page hook state to 1 to get 1st page from api
   */
  const refetch = () => {
    setPage(0);
  };

  const fetchData = useCallback(
    async ({ handleLoading, pageNo, q }) => {
      handleLoading(true);
      try {
        const res = await api.instance.get(`${q || query}&page=${pageNo}`);
        handleLoading(false);

        const responseData = res?.data?.payload?.data;
        const responseMeta = res?.data?.payload?.meta;

        setMeta(responseMeta);
        if (pageNo > 1) {
          setItems((arr) => {
            return [...arr, ...responseData];
          });
        } else {
          setItems(responseData);
        }
      } catch (e) {
        handleLoading(false);
        setError(e);
      }
    },
    [api, query]
  );

  /**
   * Checks if current page is last page
   * to notify hook that api can not fetch more items
   */
  useEffect(() => {
    if (page >= meta?.totalPages) {
      setCanFetch(false);
    }
  }, [meta, page]);

  /**
   * Checks if current page is last page
   * to notify hook that api has reached end of items
   */
  useEffect(() => {
    if (page >= meta?.totalPages) {
      setHasReachedEnd(true);
    }
  }, [meta, page]);

  /**
   * Checks if page is not undefined
   * to notify hook that api can fetch and has not reached end
   */
  useEffect(() => {
    if (page) {
      setCanFetch(true);
      setHasReachedEnd(false);
    }
  }, [page]);

  /**
   * Hook to process api request
   * Handles on loading, on successful request & on error
   */
  // useEffect(() => {
  //   if (canFetch) {
  //     fetchData();
  //   }
  // }, [api, canFetch, fetchData, handleLoading, page, query]);

  return {
    items,
    isLoading,
    error,
    isLoadingMore,
    page,
    setPage,
    goToNextPage,
    hasReachedEnd,
    refetch,
    handleRequest,
    meta
  };
};

export default usePaginatedQuery;
