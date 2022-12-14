import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetTaskCalendar = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(async () => {
    return await handleRequest({
      url: '/tasks/analytics-calendar',
      requestType: ApiRequestType.GET
    });
  }, [handleRequest]);

  return {
    sendRequest,
    ...props
  };
};

export default useGetTaskCalendar;
