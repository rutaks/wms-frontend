import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.user.FORGOT_PASSWORD_START:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, message: null, loading: true, error: null, success: false }
      };
    case actionTypes.user.FORGOT_PASSWORD_END:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, loading: false, success: false }
      };
    case actionTypes.user.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: { loading: false, message: payload.message, error: null, success: true }
      };
    case actionTypes.user.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, message: null, error: payload }
      };
    default:
      return null;
  }
};
