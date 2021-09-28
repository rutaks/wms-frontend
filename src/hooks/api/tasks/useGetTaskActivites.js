import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetTaskActivites = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ query, page = 1 }) => {
      let queryStr = `page=${page}`;
      if (query !== undefined && query !== '') {
        queryStr += `&${query}`;
      }
      return await handleRequest({
        url: `/tasks/activities?${queryStr}`,
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

export default useGetTaskActivites;
