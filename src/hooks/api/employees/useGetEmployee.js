import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetEmployee = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ uuid }) => {
      return await handleRequest({
        url: `/employees/${uuid}`,
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

export default useGetEmployee;
