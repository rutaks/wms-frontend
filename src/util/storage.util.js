export const storeRefreshToken = (refreshToken) => {
  localStorage.setItem('REFRESH_TOKEN', JSON.stringify(refreshToken));
};

export const getRefreshToken = () => {
  try {
    const token = localStorage.getItem('REFRESH_TOKEN');
    return token === 'null' ? null : token;
  } catch (error) {
    return null;
  }
};

export const storeAccessToken = (accessToken) => {
  localStorage.setItem('ACCESS_TOKEN', JSON.stringify(accessToken));
};

export const getAccessToken = () => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return token === 'null' ? null : token;
  } catch (error) {
    return null;
  }
};

export const storeLoggedInUser = (user) => {
  localStorage.setItem('LOGGED_IN_USER', JSON.stringify(user));
};

export const getLoggedInUser = () => {
  try {
    const token = localStorage.getItem('LOGGED_IN_USER');
    return token === 'null' ? null : token;
  } catch (error) {
    return null;
  }
};
