import { AppState } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
    isSideNavOpen: false
}

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setSideNav:  (state, action: PayloadAction<boolean>) => {
            state.isSideNavOpen = action.payload;
        }
    }
});

export const { setSideNav } = appSlice.actions;
export default appSlice.reducer;

