"use client";

import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseAttachement from './ExpenseAttachement'
import { ExpenseCreationPayload } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createExpense } from '@/app/actions/expense';
import { addToast, ToastType } from '@/lib/features/toast/toastSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { resetExpenseForm, setExpenseCreationForm } from '@/lib/features/expense/expenseSlice';

const ExpenseFormContainer = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const expenseCreationForm = useAppSelector(state => state.expenseSlice.creationForm);
  const dispatch = useAppDispatch();

  const addAttachment = (file: File) => {
    if (attachments.filter(f => f.name === file.name && f.size === file.size).length > 0) {
      return;
    }
    setAttachments(prevAttachments => [...prevAttachments, file]);
  }

  const removeAttachment = (file: File) => {
    setAttachments(prevAttachments => prevAttachments.filter(attachment => attachment !== file));
  }

  const handleSubmit = async () => {
    const payload = {
      name: expenseCreationForm.name,
      description: expenseCreationForm.description,
      amount: expenseCreationForm.amount,
      currency: expenseCreationForm.currency,
      time: expenseCreationForm.date,
      familyId: expenseCreationForm.familyId,
      type: expenseCreationForm.type,
      categoryId: expenseCreationForm.categoryId,
    } as ExpenseCreationPayload

    dispatch(setExpenseCreationForm({ ...expenseCreationForm, "submitting": true }));

    const result = await createExpense(payload);
    if (result.status === 200) {
      dispatch(addToast({ id: getUniqueId(), message: result.message, type: ToastType.SUCCESS }));
      dispatch(resetExpenseForm());
    } else {
      dispatch(addToast({ id: getUniqueId(), message: result.error, type: ToastType.ERROR }));
    }
    dispatch(setExpenseCreationForm({ ...expenseCreationForm, "submitting": false }));
  }

  return (
    <div className="w-full h-full flex flex-col justify-around overflow-y-scroll hide-scrollbar">
      <div className="w-full h-[calc(100%-40px)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 h-full flex flex-col">
          <ExpenseForm isFamilyExpense={false} />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <ExpenseAttachement
            addAttachment={addAttachment}
            removeAttachment={removeAttachment}
            attachments={attachments} />
        </div>
      </div>
      <div className="w-full flex justify-end items-center p-2">
        <button className="px-2 py-1 m-2 rounded bg-dark-bg text-light-color-text">Cancel</button>
        <button
          className={`px-2 py-1 m-2 rounded ${expenseCreationForm.submitting ? "bg-light-bg" : "bg-other-bg"} text-other-text`}
          onClick={handleSubmit}
          disabled={expenseCreationForm.submitting}
        >{expenseCreationForm.submitting ? "Creating" : "Create"}</button>
      </div>
    </div>
  )
}

export default ExpenseFormContainer
