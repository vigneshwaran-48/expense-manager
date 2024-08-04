import { AppState } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
  isSideNavOpen: false,
  title: "Expense Manager",
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setSideNav: (state, action: PayloadAction<boolean>) => {
      state.isSideNavOpen = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setSideNav, setTitle } = appSlice.actions;
export default appSlice.reducer;
