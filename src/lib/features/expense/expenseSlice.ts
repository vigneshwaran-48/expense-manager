import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const NOT_SELECTED_CATEGORY_ID = "not-selected";

type CreationForm = {
  subject: string,
  description: string,
  date: string,
  total: number,
  categoryId: string,
  currency: string
}

const initialState = {
  creationForm: {
    subject: "",
    description: "",
    date: "2024-07-02",
    total: 0,
    categoryId: NOT_SELECTED_CATEGORY_ID,
    currency: "INR"
  } as CreationForm
}

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenseCreationForm: (state, action: PayloadAction<CreationForm>) => {
      state.creationForm = action.payload;
    }
  }
})

export const { setExpenseCreationForm } = expenseSlice.actions;
export default expenseSlice.reducer;
