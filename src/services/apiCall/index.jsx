
import { deleted, get, patch, post } from '../Methods';
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

  getContactSuggestions : async params => {
    console.log("Params", apis?.getContactSuggestions, params)
    let result = await post(apis?.getContactSuggestions, params)
    if (result?.status === 200) return result?.data?.data
    else throw result
  },
 
  //GET API CALL
  getNationalities: async params => {
    let result = await get(Apis.nationalities, params);
    if (result.status === 200) return result.data;
  },

  getNotifications : async params => {
    let result = await get(`${apis?.getNotification}/${params?.page}/${params?.pageSize}`)
    // let result = await get(
    //   'http://51.20.253.189:3000/api/v1/notification/1/10'
    // )
    if (result?.status) return result?.data?.data
    else throw result
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

