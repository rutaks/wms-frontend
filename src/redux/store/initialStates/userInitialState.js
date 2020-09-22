import checkUser from '../../../helpers/checkUser';

export const userInitialState = {
  isAuth: checkUser(),
  user: localStorage.IJISHO_MANAGER_USER || '',
  isTokenExpired: false,
  login: {
    success: false,
    loading: false,
    message: null,
    error: null
  },
  forgotPassword: {
    success: false,
    loading: false,
    message: null,
    error: null
  },
  resetPassword: {
    success: false,
    loading: false,
    message: null,
    error: null
  }
};
