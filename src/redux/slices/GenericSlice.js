import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  landingWidget: true,
};

const genericSlice = createSlice({
  name: 'generic',
  initialState,
  reducers: {
    toggleLandingWidget: (state, action) => {
      state.landingWidget = action.payload;
      // console.log("Landing Widget state", state.landingWidget )
    },
  },
});

export const {toggleLandingWidget} = genericSlice.actions;

export default genericSlice.reducer;
