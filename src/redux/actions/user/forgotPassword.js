import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload = {}) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/v1/auth/forgot-password',
      data: { ...payload },
      onStart: actionTypes.user.FORGOT_PASSWORD_START,
      onEnd: actionTypes.user.FORGOT_PASSWORD_END,
      onSuccess: actionTypes.user.FORGOT_PASSWORD_SUCCESS,
      onFailure: actionTypes.user.FORGOT_PASSWORD_FAILURE
    })
  );
