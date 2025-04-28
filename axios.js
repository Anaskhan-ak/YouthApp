import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from './src/environment';

axios.defaults.baseURL = config?.baseUrl; 
const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async request => {
    let token = await AsyncStorage.getItem('token');
    if (token != undefined) {
      request.headers = {
         Authorization: `Bearer ${token}`,
        'Content-Type': request.headers['Content-Type'],
      };
    } else {
      if (request?.Authorization) {
        request.headers = {
          Authorization: request.Authorization,
        };
      } else {
        request.headers = {
          'Content-Type': request.headers['Content-Type'],
        };
      }
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiInstance;