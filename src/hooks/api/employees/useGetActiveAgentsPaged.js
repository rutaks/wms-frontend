import usePaginatedQuery from '../../usePaginatedQuery';

/**
 * Hook to get farmer's previous goals
 * @author Awesomity Lab
 * @version 1.0
 */
const useGetActiveAgentsPaged = () => {
  const { handleRequest, ...paginatedQueryHook } = usePaginatedQuery();

  const sendRequest = () => {
    return handleRequest(
      `employees?e_._isDeleted=false&e_._employeeRole=FIELD_AGENT&order=e_._lastUpdatedOn'''ASC`
    );
  };

  return {
    ...paginatedQueryHook,
    sendRequest
  };
};

export default useGetActiveAgentsPaged;
