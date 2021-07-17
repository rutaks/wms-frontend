import decode from 'jwt-decode';
/**
 * A function used check if user is logged in through checking if token exists
 * @author rutaks Lab
 * @since 06.05.2020
 */
export default () => {
  try {
    const isAuth = !!localStorage.IJISHO_MANAGER_TOKEN;
    return isAuth;
  } catch (error) {
    return false;
  }
};

export const isUserTokenExpired = () => {
  try {
    const { exp } = getToken();
    const d = new Date(0);
    d.setUTCSeconds(exp);
    return new Date() >= d;
  } catch (error) {
    return false;
  }
};

export const getToken = () => {
  try {
    const token = localStorage.IJISHO_MANAGER_TOKEN;
    return decode(token);
  } catch (error) {
    return {};
  }
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.IJISHO_MANAGER_USER);
  } catch (error) {
    return {};
  }
};
