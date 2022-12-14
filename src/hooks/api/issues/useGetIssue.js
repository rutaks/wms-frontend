import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetIssue = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ uuid }) => {
      return await handleRequest({
        url: `/issues/${uuid}`,
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

export default useGetIssue;
