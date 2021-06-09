import axios from 'axios';

// Set config defaults when creating the instance
export const APIPOS = axios.create({
  baseURL: `http://dreamtechnology.id/testnode/`,
});

// // Alter defaults after instance has been created
export const setAPIPOS = (bearer = '', apikey = '') => {
  APIPOS.defaults.headers.common['Authorization'] = bearer;
  APIPOS.defaults.headers.common['apikey'] = apikey;
  APIPOS.defaults.headers.common['appnumber'] = '20210316';
};


export const API = axios.create({
  baseURL : `http://dreamtechnology.id/testnode/v1/`
})