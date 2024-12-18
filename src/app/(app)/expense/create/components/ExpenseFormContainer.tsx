"use client";

import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseAttachement from './ExpenseAttachement'
import { Expense, ExpenseCreationPayload } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createExpense, editExpense } from '@/app/actions/expense';
import { addToast, ToastType } from '@/lib/features/toast/toastSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { NOT_SELECTED_CATEGORY_ID, resetExpenseForm, setExpenseCreationForm } from '@/lib/features/expense/expenseSlice';
import { useRouter } from 'next/navigation';

const ExpenseFormContainer = ({ isFamily = false, isEdit = false, expense }: { expense?: Expense, isEdit?: boolean, isFamily?: boolean }) => {
  const [invoices, setInvoices] = useState<File[]>([]);
  const expenseCreationForm = useAppSelector(state => state.expenseSlice.creationForm);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const addInvoice = (file: File) => {
    if (invoices.filter(f => f.name === file.name && f.size === file.size).length > 0) {
      return;
    }
    setInvoices(prevAttachments => [...prevAttachments, file]);
  }

  const removeInvoice = (file: File) => {
    setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice !== file));
  }

  const handleSubmit = async () => {
    if (isEdit && !expense) {
      throw new Error("expense should be present in a edit form!");
    }
    const payload = {
      name: expenseCreationForm.name,
      description: expenseCreationForm.description,
      amount: expenseCreationForm.amount,
      currency: expenseCreationForm.currency,
      time: expenseCreationForm.date,
      familyId: expenseCreationForm.familyId,
      type: expenseCreationForm.type,
    } as ExpenseCreationPayload

    if (expenseCreationForm.categoryId !== NOT_SELECTED_CATEGORY_ID) {
      payload.categoryId = expenseCreationForm.categoryId;
    }

    dispatch(setExpenseCreationForm({ ...expenseCreationForm, "submitting": true }));

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    invoices.forEach(invoice => {
      formData.append("invoices", invoice);
    });
    const result = isEdit ? await editExpense(expense?.id || "null", formData, expenseCreationForm.familyId) : await createExpense(formData, expenseCreationForm.familyId);
    if (result.status === 200) {
      dispatch(addToast({ id: getUniqueId(), message: result.message, type: ToastType.SUCCESS }));
      if (isEdit) {
        return;
      }
      setInvoices([]);
      dispatch(resetExpenseForm());
      if (isFamily) {
        router.push(`/family/${expenseCreationForm.familyId}/expenses`);
      } else {
        router.push("/expense");
      }
    } else {
      dispatch(addToast({ id: getUniqueId(), message: result.error, type: ToastType.ERROR }));
      dispatch(setExpenseCreationForm({ ...expenseCreationForm, "submitting": false }));
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-around overflow-y-scroll hide-scrollbar">
      <div className="w-full h-[calc(100%-40px)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 h-full flex flex-col">
          <ExpenseForm isFamilyExpense={isFamily} isEdit={isEdit} expense={expense} />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <ExpenseAttachement
            addAttachment={addInvoice}
            removeAttachment={removeInvoice}
            attachments={invoices} />
        </div>
      </div>
      <div className="w-full flex justify-end items-center p-2">
        <button
          className="px-2 py-1 m-2 rounded bg-dark-bg text-light-color-text"
          onClick={() => router.push(isFamily
            ? `/family/${expenseCreationForm.familyId}/expenses` : "/expense")}
        >Cancel</button>
        <button
          className={`px-2 py-1 m-2 rounded ${expenseCreationForm.submitting ? "bg-light-bg" : "bg-other-bg"} text-other-text`}
          onClick={handleSubmit}
          disabled={expenseCreationForm.submitting}
        >{expenseCreationForm.submitting ? isEdit ? "Editing" : "Creating" : isEdit ? "Edit" : "Create"}</button>
      </div>
    </div>
  )
}

export default ExpenseFormContainer
