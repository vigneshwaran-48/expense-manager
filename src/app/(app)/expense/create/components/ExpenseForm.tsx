"use client";

import TextInput from '@/app/(app)/components/form/TextInput';
import { setExpenseCreationForm } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react'

const ExpenseForm = () => {

  const creationForm = useAppSelector(state => state.expenseSlice.creationForm);
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    dispatch(setExpenseCreationForm())
  }
  return (
    <div className="w-full h-full flex flex-col">
      <TextInput id="subject-id" name="subject" displayName="Subject" value={creationForm.subject} />
    </div>
  )
}

export default ExpenseForm
