import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.user.RESET_PASSWORD_START:
      return {
        ...state,
        resetPassword: { ...state.resetPassword, message: null, loading: true, error: null, success: false }
      };
    case actionTypes.user.RESET_PASSWORD_END:
      return {
        ...state,
        resetPassword: { ...state.resetPassword, loading: false, success: false }
      };
    case actionTypes.user.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: { loading: false, message: payload.message, error: null, success: true }
      };
    case actionTypes.user.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassword: { ...state.resetPassword, message: null, error: payload, success: false }
      };
    default:
      return null;
  }
};
