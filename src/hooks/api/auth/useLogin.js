import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that resets user's password
 * @author rutaks
 * @version 1.0
 */
export const useLogin = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ email, password }) => {
      return await handleRequest({
        url: '/auth/admin/login',
        requestType: ApiRequestType.POST,
        data: { email, password }
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useLogin;
