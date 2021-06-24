import axios from "axios";
// import {BASE_URL} from '@env';

export const baseURL = "http://localhost:3000";

const instance = axios.create({
  baseURL,
});

export default instance;
