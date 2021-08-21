import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useCreateClient = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ data }) => {
      return await handleRequest({
        url: '/clients',
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

export default useCreateClient;