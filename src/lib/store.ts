import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import appSlice from "./features/app/appSlice";
import toastSlice from "./features/toast/toastSlice";
import familySlice from "./features/family/familySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userSlice,
      appSlice,
      toastSlice,
      familySlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
