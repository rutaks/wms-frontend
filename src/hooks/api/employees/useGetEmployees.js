import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetEmployees = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ query, page = 1, limit = 10 }) => {
      let queryStr = `page=${page}&limit=${limit}`;
      if (query !== undefined && query !== '') {
        queryStr += `&${query}`;
      }
      return await handleRequest({
        url: `/employees?${queryStr}`,
        requestType: ApiRequestType.GET
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useGetEmployees;
