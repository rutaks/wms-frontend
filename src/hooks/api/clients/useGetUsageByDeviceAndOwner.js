import { useCallback, useState } from 'react';
import ApiRequestType from '../../../enums/api-request-type.enum';
import useMutation from '../../useMutation';

/**
 * Hook that create's a client
 * @author rutaks
 * @version 1.0
 */
export const useGetUsageByDeviceAndOwner = () => {
  const [page, setPage] = useState(1);
  const { handleRequest, ...props } = useMutation({});

  const sendRequest = useCallback(
    async ({ ownerUuid, deviceCode, page = 1 }) => {
      return await handleRequest({
        url: `/devices/usages?o_._uuid=${ownerUuid}&d_._code=${deviceCode}&page=${page}`,
        requestType: ApiRequestType.GET
      });
    },
    [handleRequest]
  );

  return {
    sendRequest,
    setPage,
    ...props
  };
};

export default useGetUsageByDeviceAndOwner;
