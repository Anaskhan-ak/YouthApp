
import { deleted, documentPost, get, patch, post } from '../Methods';
import { apis } from '../endPoints';

export const apiCall = {
  //POST API CALL
  SignUp: async obj => {
    let result = await post(apis?.signUp, obj);
    if (result?.status >= 200 && result?.status < 400) return result.data;
    else throw result;
  },
  Login: async obj => {
    let result = await post(apis?.login, obj);
    if (result?.status == 200) return result.data;
    else throw result;
  },
  SignUpWithGoogle: async obj => {
    let result = await post(apis?.loginWithGoogle, obj);
    if (result?.status == 201) return result.data;
    else throw result;
  },
  VerifyOtp: async obj => {
    let result = await post(apis?.otp, obj);
    if (result?.status >= 200 && result?.status < 400) return result.data;
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
  createNewPost : async params => {
    let result = await documentPost(apis?.createPost, params)
    if (result?.status >= 200 && result?.status < 400) return result?.data?.youdio
    // if (result?.status === 200) return result?.data
    else throw result
  },  
  forgotPassword : async params => {
    let result = await post(apis?.forgotPassword, params)
    if (result?.status === 200) return result?.data
    else throw result
  },  
  verifyForgotPassword : async params => {
    let result = await post(apis?.verifyForgetPassword, params)
    if (result?.status === 200) return result?.data
    else throw result
  },
  resetPassword : async params => {
    let result = await post(apis?.resetPassword, params)
    if (result?.status === 200) return result?.data
    else throw result
  },
 
  //GET API CALL
  getAllYudios : async (params) => {
    let result = await post(apis?.getYudios, params)
    if (result?.status) return result?.data?.data?.posts
    else throw result
  },

  getAllDocuments : async (params) => {
    let result = await post(apis?.getDocuments, params)
    if (result?.status) return result?.data?.posts
    else throw result
  },
 
  //GET API CALL
  getNotifications: async params => {
    let result = await get(
      `${apis?.getNotification}/${params?.page}/${params?.pageSize}`,
    );
    if (result?.status) return result?.data?.data;
    else throw result;
  },
  getAllInterests : async () => {
    let result = await get(apis?.getAllInterests)
    if (result?.status) return result?.data?.data
    else throw result
  },
 getOnboardingContent : async () => {
    let result = await get(apis?.getOnBoardingContent)
    if (result?.status) return result?.data
    else throw result
  },
  getChats: async ({userId}) => {
    let result = await get(
      `${apis?.getChats}/${userId}`,
    );
    if (result?.status) return result?.data?.chats
    else throw result;
  },

  getChatMessages: async ({chatId}) => {
    let result = await get(
      `${apis?.getMessages}/${chatId}`,
    );
    if (result?.status) return result?.data?.messages
    else throw result;
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
