import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetClientDevices = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ uuid, page = 1 }) => {
      return await handleRequest({
        url: `/devices?o_._uuid=${uuid}&page=${page}`,
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

export default useGetClientDevices;
