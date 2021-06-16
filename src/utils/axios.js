import axios from 'axios';
import envs from '../envs';

// Set config defaults when creating the instance
export const APIPOS = axios.create({
  baseURL: envs.URL,
});

// // Alter defaults after instance has been created
export const setAPIPOS = (bearer = '', apikey = '') => {
  APIPOS.defaults.headers.common['Authorization'] = bearer;
  APIPOS.defaults.headers.common['apikey'] = apikey;
  APIPOS.defaults.headers.common['appnumber'] = '20210316';
};
