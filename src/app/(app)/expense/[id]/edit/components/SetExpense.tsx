"use client"

import { NOT_SELECTED_CATEGORY_ID, setExpenseCreationForm } from "@/lib/features/expense/expenseSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Expense } from "@/util/AppTypes";
import { useEffect } from "react";

export const SetExpense = ({ expense }: { expense: Expense }) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setExpenseCreationForm({
      name: expense.name,
      familyId: expense.family?.id || null,
      date: expense.time,
      type: expense.type,
      amount: expense.amount,
      currency: expense.currency,
      categoryId: expense.category?.id || NOT_SELECTED_CATEGORY_ID,
      chooseType: false,
      submitting: false,
      description: expense.description
    }))
  }, []);

  return <></>
}
