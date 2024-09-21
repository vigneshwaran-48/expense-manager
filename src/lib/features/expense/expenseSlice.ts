import { ExpenseType } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const NOT_SELECTED_CATEGORY_ID = "not-selected";

type CreationForm = {
  name: string,
  description: string,
  date: string,
  amount: number,
  categoryId: string,
  currency: string,
  submitting: boolean,
  familyId?: string,
  type: ExpenseType
}

const initialState = {
  creationForm: {
    name: "",
    description: "",
    date: "2024-07-02",
    amount: 0,
    categoryId: NOT_SELECTED_CATEGORY_ID,
    currency: "INR",
    submitting: false,
    type: "PERSONAL"
  } as CreationForm
}

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenseCreationForm: (state, action: PayloadAction<CreationForm>) => {
      state.creationForm = action.payload;
    },
    resetExpenseForm: (state) => {
      state.creationForm.name = "";
      state.creationForm.description = "";
      state.creationForm.submitting = false;
      state.creationForm.categoryId = NOT_SELECTED_CATEGORY_ID;
      state.creationForm.type = "PERSONAL";
      state.creationForm.familyId = undefined;
      state.creationForm.date = "2024-07-02";
      state.creationForm.currency = "INR";
      state.creationForm.amount = 0;
    }
  }
})

export const { setExpenseCreationForm, resetExpenseForm } = expenseSlice.actions;
export default expenseSlice.reducer;
