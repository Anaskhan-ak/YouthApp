import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from './src/environment';

axios.defaults.baseURL = config?.baseUrl;
const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async request => {
    let token = await AsyncStorage.getItem('token');
    if (token != undefined) {
      request.headers = {
        Authorization: `Bearer ${token}`,
        ...(request.headers || {}), // preserve any existing headers
      };
      
    } else {
      if (request?.Authorization) {
        request.headers = {
          Authorization: request.Authorization,
        };
      } else {
        request.headers = {
          Authorization: `Bearer ${token}`,
          ...(request.headers || {}), // preserve any existing headers
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
