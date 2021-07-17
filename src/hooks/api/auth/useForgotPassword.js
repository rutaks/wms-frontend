import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that resets user's password
 * @author rutaks
 * @version 1.0
 */
export const useForgotPassword = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ email }) => {
      return await handleRequest({
        url: '/auth/password/reset?medium=EMAIL',
        requestType: ApiRequestType.POST,
        data: { email }
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useForgotPassword;
