import axiosHelper from '../helpers/axiosHelper';
import { actionTypes } from '../redux/action-types';

/**
 * An axios middleware used to make API calls based on params passed from the `apiAction`.
 * Will dispatch states based on state {start,end,success,fail} passed respectively
 * @since 06.05.2020
 */
const apiMiddleware = ({ dispatch, getState }) => (next) => async ({ type = '', payload = {} }) => {
  if (type !== actionTypes.api.API_REQUEST) {
    return next({ type, payload });
  }
  try {
    dispatch({ type: payload.onStart, payload: { loading: true } });
    const { data } = await axiosHelper(payload.httpOptions)[payload.method](payload.url, payload.data);
    console.log('SUCCESS ~ ', data);
    dispatch({ type: payload.onSuccess, payload: data });
  } catch (error) {
    console.log('ERROR ~ ', error);
    console.log('ERROR_CONFIG ~ ', error.config);
    console.log('ERROR_RESPONSE ~ ', error.response);
    const err = error.response ? error.response.data.message : error.message;
    dispatch({
      type: payload.onFailure,
      payload: err
    });
  }
  dispatch({ type: payload.onEnd, payload: { loading: false } });
  return getState();
};

export default apiMiddleware;
