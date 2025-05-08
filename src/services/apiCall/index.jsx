
import { deleted, documentPost, get, patch, post } from '../Methods';
import { apis } from '../endPoints';

export const apiCall = {
  //POST API CALL
  SignUp: async obj => {
    let result = await post(apis?.signUp, obj);
    if (result?.status == 200) return result.data;
    else throw result;
  },
  Login: async obj => {
    let result = await post(apis?.login, obj);
    if (result?.status == 200) return result.data;
    else throw result;
  },
  SignUpWithGoogle: async obj => {
    let result = await post(apis?.loginWithGoogle, obj);
    if (result?.status == 200) return result.data;
    else throw result;
  },
  VerifyOtp: async obj => {
    let result = await post(apis?.otp, obj);
    if (result?.status == 200) return result.data;
    else throw result;
  },

  getContactSuggestions: async params => {
    let result = await post(apis?.getContactSuggestions, params);
    if (result?.status === 200) return result?.data?.data;
    else throw result;
  },

  getFollowing: async params => {
    let result = await post(`${apis?.getFollowing}${params}`);
    if (result?.status === 200) return result?.data?.data;
    else throw result;
  },

  follow: async params => {
    let result = await post(apis?.follow, params);
    if (result?.status === 200) return result?.data?.data;
    else throw result;
  },

  unfollow: async params => {
    let result = await post(apis?.unfollow, params);
    if (result?.status === 200) return result?.status;
    else throw result;
  },

  addInterest : async params => {
    let result = await post(apis?.addInterest, params)
    if (result?.status === 200) return result?.status
    else throw result
  },

  generateWaveforms : async params => {
    let result = await documentPost(apis?.generateWaveforms, params)
    if (result?.status === 200) return result?.data?.yudioWaveform
    else throw result
  },
 
  //GET API CALL
  getNotification: async params => {
    let result = await get(apis?.getNotification, params);
    if (result.status === 200) return result.data;
  },

  getNotifications: async params => {
    let result = await get(
      `${apis?.getNotification}/${params?.page}/${params?.pageSize}`,
    );
    // let result = await get(
    //   'http://51.20.253.189:3000/api/v1/notification/1/10'
    // )
    if (result?.status) return result?.data?.data;
    else throw result;
  },

  getAllInterests : async () => {
    let result = await get(apis?.getAllInterests)
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
    let result = await deleted(Apis.deleteNotification, params);
    if (result.status === 200) return result.data?.data;
  },
};
