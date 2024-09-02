import { Category } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CreationForm = {
  subject: string,
  description: string,
  date: string,
  total: number,
  category: Category,
  currency: string
}

const initialState = {
  creationForm: {
    subject: "",
    description: "",
    date: "",
    total: 0,
    category: {} as Category,
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
