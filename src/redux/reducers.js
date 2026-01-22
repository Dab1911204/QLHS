import { combineReducers } from "@reduxjs/toolkit";
import { userInfoSlice } from "./slices/userInfo";

export const reducers = combineReducers({
  userInfo: userInfoSlice.reducer,
});

export const whitelist = ['userInfo'];
