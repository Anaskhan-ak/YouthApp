import AsyncStorage from '@react-native-async-storage/async-storage';
import apiInstance from '../../../axios';
import { errorHandler } from './errorHandler';


const rawConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const formDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const get = async (endPoint, params) => {
  try {
    const result = await apiInstance.get(endPoint, {params});
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const post = async (endPoint, data) => {
  try {
    const token = await AsyncStorage.getItem('token');
    let config = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'deviceuid': '123',
    };
    const result = await apiInstance.post(endPoint, data);
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const documentPost = async (endPoint, data) => {
  console.log("Data", data)
  try {
    const result = await apiInstance.post(endPoint, data, formDataConfig);
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};



export const patch = async (endPoint, data) => {
  try {
    const result = await apiInstance.patch(endPoint, data, rawConfig);
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const put = async (endPoint, data) => {
  try {
    const result = await apiInstance.put(endPoint, data, rawConfig);
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};





export const deleted = async (endPoint,params) => {
  try {
    const result = await apiInstance.delete(endPoint, {params});
    return result;
  } catch (e) {
    throw errorHandler(e);
  }
};