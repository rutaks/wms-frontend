import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useModifyTask = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async (uuid, medium, { data }) => {
      return await handleRequest({
        url: `/tasks/${uuid}?field=${medium}`,
        requestType: ApiRequestType.PUT,
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

export default useModifyTask;
