import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that resets user's password
 * @author rutaks
 * @version 1.0
 */
export const useResetPassword = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ password, token }) => {
      return await handleRequest({
        url: `/auth/password/reset/${token}?medium=EMAIL`,
        requestType: ApiRequestType.PUT,
        data: { newPassword: password }
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useResetPassword;
