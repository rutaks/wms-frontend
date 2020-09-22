import { actionTypes } from '../../action-types';

export default (state, { type, payload }) => {
  switch (type) {
    case actionTypes.user.LOGIN_USER_START:
      return {
        ...state,
        login: { ...state.login, success: false, message: null, loading: true, error: null }
      };
    case actionTypes.user.LOGIN_USER_END:
      return {
        ...state,
        login: { ...state.login, loading: false }
      };
    case actionTypes.user.LOGIN_USER_SUCCESS:
      // localStorage.IJISHO_MANAGER_USER = JSON.stringify(payload.payload.user);
      // localStorage.IJISHO_MANAGER_BRANCH_ID = payload.payload.user.branch.id;
      // localStorage.IJISHO_MANAGER_TOKEN = payload.payload.token;
      return {
        ...state,
        isAuth: true,
        profile: payload.payload.user,
        // user: localStorage.IJISHO_MANAGER_USER,
        login: { loading: false, success: true, message: payload.message, error: null },
        isTokenExpired: false
      };
    case actionTypes.user.LOGIN_USER_FAILURE:
      return {
        ...state,
        login: { loading: false, success: false, message: null, error: payload }
      };
    case actionTypes.user.TOKEN_EXPIRED:
      return {
        ...state,
        isTokenExpired: true
      };
    default:
      return null;
  }
};
