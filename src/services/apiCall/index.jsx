
import {get, post, patch, documentPost, put, deleted} from '../Methods';
import { apis } from '../endPoints';

export const apiCall = {
  //POST API CALL
  SignUp: async obj => {
    console.log(obj)
    let result = await post(apis?.signUp, obj);
    console.log("res",result)
    if (result?.status==201) return result.data;
    else throw result;
  },
 
  //GET API CALL
  getNationalities: async params => {
    let result = await get(Apis.nationalities, params);
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

