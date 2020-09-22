import { actionTypes } from '../../action-types';
import apiAction from '../../../helpers/apiAction';

export default (payload, token) => (dispatch) =>
  dispatch(
    apiAction({
      method: 'post',
      url: `/v1/auth/reset-password/${token}`,
      data: { ...payload },
      onStart: actionTypes.user.RESET_PASSWORD_START,
      onEnd: actionTypes.user.RESET_PASSWORD_END,
      onSuccess: actionTypes.user.RESET_PASSWORD_SUCCESS,
      onFailure: actionTypes.user.RESET_PASSWORD_FAILURE
    })
  );
