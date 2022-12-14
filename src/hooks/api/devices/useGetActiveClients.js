import usePaginatedQuery from '../../usePaginatedQuery';

/**
 * Hook to get farmer's previous goals
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetActiveClients = () => {
  const { handleRequest, ...paginatedQueryHook } = usePaginatedQuery();

  const sendRequest = () => {
    return handleRequest(`clients?`);
  };

  return {
    ...paginatedQueryHook,
    sendRequest
  };
};

export default useGetActiveClients;
