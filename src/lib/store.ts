import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import appSlice from "./features/app/appSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userSlice,
      appSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
