import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useReportIssues = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ data }) => {
      return await handleRequest({
        url: '/issues/report',
        requestType: ApiRequestType.POST,
        data
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useReportIssues;
