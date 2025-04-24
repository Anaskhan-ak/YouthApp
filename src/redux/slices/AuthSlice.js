import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: true,
  data: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    phoneNo: '',
    gender: null,
    DoB: null,
    UiD: null,
    isFirstLogin : true,
    status: true,
    photo: null,
    createdAt: null,
    coverImage: '',
    bio: '',
    friendFriends: [],
    friendships: [],
    LinkedAccount: [],
    numPosts: 0,
    numFollowers: 0,
    numFollowing: 0,
    favorites: [],
    linkedAccounts: [],
    links : []
  },
  access_token: '',
  refresh_token: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const {status, data, access_token, refresh_token} = action.payload;
      state.status = status;
      state.data = data;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
  },
});

export const getAuthState = (state) => state.auth;
export const getUserInfo = (state) => state.auth.data;
export const getAccessToken = (state) => state.auth.access_token;
export const getRefreshToken = (state) => state.auth.refresh_token;

export const {setAuthState} = AuthSlice.actions;

export default AuthSlice.reducer;
