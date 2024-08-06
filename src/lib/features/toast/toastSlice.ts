import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export enum ToastType {
  ERROR,
  SUCCESS,
  WARNING,
}

const initialState: Toast[] = [];

const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.splice(state.findIndex((toast) => toast.id !== action.payload));
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
