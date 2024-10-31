import { Expense, ExpenseType, SearchBy } from "@/util/AppTypes";
import { getCurrentTimeForExpense } from "@/util/timeUtil";
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
  familyId: string | null,
  type: ExpenseType,
  chooseType: boolean
}

interface ExpensePopup {
  show: boolean,
  expense?: Expense,
  canEdit: boolean
}

interface State {
  creationForm: CreationForm,
  expenses: Expense[],
  search: {
    query: string,
    searchBy: SearchBy
  },
  expensePopup: ExpensePopup
}

const initialState: State = {
  creationForm: {
    name: "",
    description: "",
    date: getCurrentTimeForExpense(),
    amount: 0,
    categoryId: NOT_SELECTED_CATEGORY_ID,
    currency: "INR",
    submitting: false,
    type: "PERSONAL",
    chooseType: false,
    familyId: null
  } as CreationForm,
  expenses: [],
  search: {
    query: "",
    searchBy: "ALL"
  },
  expensePopup: {
    show: false,
    canEdit: false
  }
}

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    setExpenseCreationForm: (state, action: PayloadAction<CreationForm>) => {
      console.log("Hello");
      state.creationForm = action.payload;
    },
    resetExpenseForm: (state) => {
      state.creationForm.name = "";
      state.creationForm.description = "";
      state.creationForm.submitting = false;
      state.creationForm.categoryId = NOT_SELECTED_CATEGORY_ID;
      state.creationForm.type = "PERSONAL";
      state.creationForm.familyId = null;
      state.creationForm.date = getCurrentTimeForExpense();
      state.creationForm.currency = "INR";
      state.creationForm.amount = 0;
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    setSearchBy: (state, action: PayloadAction<SearchBy>) => {
      state.search.searchBy = action.payload;
    },
    setExpensePopup: (state, action: PayloadAction<ExpensePopup>) => {
      state.expensePopup = action.payload;
    }
  }
})

export const { setExpenseCreationForm, resetExpenseForm, setExpenses, setQuery, setSearchBy, setExpensePopup } = expenseSlice.actions;
export default expenseSlice.reducer;
