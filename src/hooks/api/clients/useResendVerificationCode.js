import { useCallback } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useResendVerificationCode = () => {
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ email }) => {
      return await handleRequest({
        url: `/clients/resend-verification?email=${email}`,
        requestType: ApiRequestType.POST
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    ...props
  };
};

export default useResendVerificationCode;
