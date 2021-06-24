// import {BASE_URL} from '@env';
import Axios from "axios";
import React from "react";
import ApiContext from "./ApiContext";
import { baseURL } from "../../util/api-client.util";

/**
 * Context Hook holding farmer instance during farmer form process
 * @param props
 */
const ApiProvider = ({ children }) => {
  const instance = Axios.create({
    baseURL,
  });

  return <ApiContext.Provider value={instance}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
