import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that resets user's password
 * @author rutaks
 * @version 1.0
 */
export const useActivateAccount = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ password, token }) => {
      return await handleRequest({
        url: `/clients/confirm-account/${token}?medium=EMAIL`,
        requestType: ApiRequestType.PUT,
        data: { password }
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useActivateAccount;
