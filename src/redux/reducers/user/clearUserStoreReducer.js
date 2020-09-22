import { actionTypes } from '../../action-types';

export default (state, { type }) => {
  switch (type) {
    case actionTypes.user.CLEAR_USER_STORE:
      return {
        ...state,
        login: {
          loading: false,
          message: null,
          error: null
        },
        forgotPassword: {
          success: false,
          loading: false,
          message: null,
          error: null
        }
      };
    default:
      return null;
  }
};
