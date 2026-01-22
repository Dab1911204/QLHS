// redux/slices/userInfoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "",
  startDate: "",
  endDate: "",
  status: "",
  avatar: null,
  isLoggedIn: false,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload, isLoggedIn: true };
    },
    updateUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUserPassword: (state, action) => {
      state.password = action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUserInfo, updateUserPassword, clearUser } = userInfoSlice.actions;
export const userInfoSelector = (state) => state.userInfo;
export default userInfoSlice.reducer;
