import 'dotenv/config';
/**
 * A file where urls should be kept as well as other env variables
 * @author Awesomity Lab
 * @since 06.05.2020
 */

// eslint-disable-next-line no-undef
const { REACT_APP_BASE_URL_BACKEND } = process.env;

const backend = {
  baseUrl: REACT_APP_BASE_URL_BACKEND || 'http://devapi.ijisho.rw'
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
