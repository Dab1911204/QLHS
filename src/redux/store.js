import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInfoReducer from "./slices/userInfo";

const persistConfig = {
  key: "root",
  storage, // Sử dụng localStorage
  whitelist: ["userInfo"], // Chỉ persist userInfo
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Tạo persisted reducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
}); // Tạo store với persisted reducer

export const persistor = persistStore(store);
