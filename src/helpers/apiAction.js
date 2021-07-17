import { actionTypes } from '../redux/action-types';

/**
 * Generic function used to make axios request to an API
 * N.B: This Function is an implementation of the `apiMiddleware` where the axios call is actually made
 * @param {string} url - path of the API request
 * @param {string} method - API request method type, {POST, GET}, GET is the default option
 * @param {Object} data - data object to be sent to API
 * @param {Object} httpOptions - option to set when sending data other than json object i.e: files;
 * the option would have multipart included
 * @param {String} onStart - state on process start
 * @param {String} onEnd - state on process end
 * @param {String} onSuccess - state on process successful
 * @param {String} onFailure - state on process failed
 *
 * @return {Object} An object containing all params passed in function to send to the API
 * @author rutaks Lab
 * @since 06.05.2020
 */
export default ({
  url = '',
  method = 'GET',
  data = null,
  httpOptions = {},
  responseType = 'blob',
  onStart = actionTypes.api.API_REQUEST_START,
  onEnd = actionTypes.api.API_REQUEST_END,
  onSuccess = actionTypes.api.API_REQUEST_SUCCESS,
  onFailure = actionTypes.api.API_REQUEST_FAILURE,
  label = ''
}) => ({
  type: actionTypes.api.API_REQUEST,
  payload: {
    url,
    method,
    data,
    httpOptions,
    onSuccess,
    onFailure,
    onStart,
    onEnd,
    label
  }
});
