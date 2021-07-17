import Axios from 'axios';
import React from 'react';
import ApiContext from './ApiContext';
import { baseURL } from '../../util/constants.util';

/**
 * Context Hook holding auth instance
 * @param props
 */
const ApiProvider = ({ children }) => {
  const instance = Axios.create({ baseURL });
  const data = { instance };

  return <ApiContext.Provider value={data}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
