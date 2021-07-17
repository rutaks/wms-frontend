import { useEffect } from 'react';

const useHandleApiState = (
  { isError, isLoading, isSuccess, successResponse, error },
  { onSuccess = () => {}, onError = () => {}, onLoading = () => {} }
) => {
  useEffect(() => {
    if (isSuccess) {
      onSuccess(successResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      onError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (isLoading) {
      onLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};

export default useHandleApiState;
