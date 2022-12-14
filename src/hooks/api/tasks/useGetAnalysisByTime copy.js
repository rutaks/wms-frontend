import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetDailyAnalysis = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async (startDate, endDate) => {
      return await handleRequest({
        url: `/issues/daily-analytics?startDate=${startDate}&endDate=${endDate}`,
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

export default useGetAnalysisByTime;
