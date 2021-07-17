import { useCallback, useState } from 'react';
import { useApi } from '../context/Api';

/**
 * Hook to process api mutations such as POST,DELETE, PUT requests
 * will handle state management of request while request is being made
 * @author rutaks
 * @version 1.0
 */
export const useMutation = ({ defaultLoadingState = false }) => {
  /** Api request states */
  const api = useApi(); // api context value
  const [isError, setIsError] = useState(false); // on error hook
  const [error, setError] = useState(); // on error hook
  const [isLoading, setIsLoading] = useState(defaultLoadingState); // on loading hook
  const [isSuccess, setIsSuccess] = useState(false); // on success hook
  const [successResponse, setSuccessResponse] = useState(false); // on success hook

  /**
   * hook will process api action and
   * handle states according to response
   *
   */
  const handleRequest = useCallback(
    async ({ url, requestType, data, config = {} }) => {
      // Set request state as started
      setIsLoading(true);
      setError(null);
      setIsError(false);
      setIsSuccess(false);
      try {
        const response = await api.instance[requestType](url, data, config); // process api request async

        // Set request state as ended and successful
        setIsLoading(false);
        setSuccessResponse(response.data || response);
        setIsSuccess(true);
        setIsSuccess(false);
      } catch (e) {
        const apiError = e.response?.data?.error;
        // Set request state as ended and failed
        setError(apiError || e.message || e);
        setIsError(true);
        setIsLoading(false);
      }
    },
    [api]
  );

  return {
    isLoading,
    error,
    isError,
    handleRequest,
    isSuccess,
    successResponse
  };
};

export default useMutation;
