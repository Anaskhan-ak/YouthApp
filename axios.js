import axios from 'axios';
import { config } from './src/environment';

axios.defaults.baseURL = config?.baseUrl;
const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async request => {
    // let token = await AsyncStorage.getItem('token');
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNjBxbDM5ZjAwM2w5MXI4bDE4YmQ4MHoiLCJpYXQiOjE3NDU4MjU2NjIsImV4cCI6MTc3NzM4MzI2Mn0.URplVzEAO0exkChDiMcfivQ29qrQzqRWQ4u1CHwbVAc';
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
