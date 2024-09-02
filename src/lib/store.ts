import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import appSlice from "./features/app/appSlice";
import toastSlice from "./features/toast/toastSlice";
import familySlice from "./features/family/familySlice";
import inviteMemberSlice from "./features/invite/inviteMemberSlice";
import categorySlice from "./features/category/categorySlice";
import expenseSlice from "./features/expense/expenseSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userSlice,
      appSlice,
      toastSlice,
      familySlice,
      inviteMemberSlice,
      categorySlice,
      expenseSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
