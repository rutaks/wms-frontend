import 'dotenv/config';
/**
 * A file where urls should be kept as well as other env variables
 * @author rutaks Lab
 * @since 06.05.2020
 */

// eslint-disable-next-line no-undef
const { REACT_APP_BASE_URL_BACKEND, REACT_APP_GOOGLE_MAP_KEY } = process.env;

const backend = {
  baseUrl: REACT_APP_BASE_URL_BACKEND || 'http://devapi.ijisho.rw',
  googleMapApiKey: REACT_APP_GOOGLE_MAP_KEY
};

const getManagerBranch = () => {
  return localStorage.getItem('IJISHO_MANAGER_BRANCH_ID');
};

const getManagerCampany = () => {
  try {
    const manager = JSON.parse(localStorage.IJISHO_MANAGER_USER);
    return manager.branch.company;
  } catch (error) {
    console.error(error);
    return { id: 0 };
  }
};

export { backend, getManagerBranch, getManagerCampany };
