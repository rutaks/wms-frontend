import React, { useEffect, useState } from 'react';
import {
  getLoggedInUser,
  storeAccessToken,
  storeLoggedInUser,
  storeRefreshToken
} from '../../util/storage.util';
import AuthContext from './AuthContext';
import { getAccessToken } from '../../util/storage.util';
import { useApi } from '../Api';

/**
 * Context Hook holding farmer instance during farmer form process
 * @param props
 */
const AuthProvider = ({ children }) => {
  const api = useApi();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const isUserLoggedIn = () => {
    const tokenFromLocalStorage = getAccessToken();
    const tokenFromApiInstance = api.instance.defaults.headers.common['Authorization'];
    return (
      (tokenFromApiInstance && tokenFromApiInstance !== '') ||
      (tokenFromLocalStorage && tokenFromLocalStorage !== '')
    );
  };

  const logoutUser = () => {
    delete api.instance.defaults.headers.common['Authorization'];
    storeAccessToken(null);
    storeRefreshToken(null);
    setUser(null);
    storeLoggedInUser(null);
    setLoggedIn(false);
  };

  const loginUser = ({ accessToken, refreshToken, user }) => {
    api.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    storeAccessToken(accessToken);
    storeRefreshToken(refreshToken);
    setUser(user);
    storeLoggedInUser(user);
    setLoggedIn(true);
  };

  useEffect(() => {
    try {
      if (isUserLoggedIn()) {
        const userStr = getLoggedInUser();
        setUser(JSON.parse(userStr || '{}'));
        setLoggedIn(true);
      }
      setLoaded(true);
    } catch (error) {
      console.log('Could not set user obj');
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const setToken = async () => {
  //     const token = getRefreshToken();

  //     const refreshAuthLogic = (failedRequest) =>
  //       Axios.post(`${baseURL}/auth/refresh-token`, {
  //         refreshToken: token
  //       })
  //         .then((res) => {
  //           const newAccessToken = res?.data.payload.accessToken;
  //           storeAccessToken(newAccessToken);
  //           failedRequest.response.config.headers.Authorization = 'Bearer ' + newAccessToken;
  //           return Promise.resolve();
  //         })
  //         .catch(() => {
  //           history.push('/login');
  //         });

  //     createAuthRefreshInterceptor(api.instance, refreshAuthLogic);
  //   };

  //   setToken();
  // }, [api.instance]);

  const data = { loggedIn, loaded, user, loginUser, logoutUser };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
