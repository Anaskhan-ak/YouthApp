
import {get, post, patch, documentPost, put, deleted} from '../Methods';
import { apis } from '../endPoints';

export const apiCall = {
  //POST API CALL
  SignUp: async obj => {
    let result = await post(apis?.signUp, obj);
    if (result?.status==201) return result.data;
    else throw result;
  },
  Login: async obj => {
    let result = await post(apis?.login, obj);
    if (result?.status==201) return result.data;
    else throw result;
  },
  VerifyOtp: async obj => {
    let result = await post(apis?.otp, obj);
    if (result?.status==201) return result.data;
    else throw result;
  },
  //GET API CALL
  getNotification: async params => {
    let result = await get(apis?.getNotification, params);
    if (result.status === 200) return result.data;
  },
  
  // PATCH API CALL
  gatePassStatus: async obj => {
    let result = await patch(Apis.gatePassStatus, obj);
    if (result.status === 200) return result.data;
  },
  
  // DELETE API CALL
  deleteNotification: async params => {
    let result = await deleted(Apis.deleteNotification,params);
    if (result.status === 200) return result.data?.data;
  },
};

