import dotenv from 'dotenv';
dotenv.config();

/**
 * A file where urls should be kept as well as other env variables
 * @author rutaks Lab
 * @since 06.05.2020
 */

// eslint-disable-next-line no-undef
const { REACT_APP_BASE_URL_BACKEND, REACT_APP_GOOGLE_MAP_KEY } = process.env;

const backend = {
  baseUrl: REACT_APP_BASE_URL_BACKEND || 'http://wms-api.ruubik.com',
  googleMapApiKey: REACT_APP_GOOGLE_MAP_KEY
};

export { backend };
