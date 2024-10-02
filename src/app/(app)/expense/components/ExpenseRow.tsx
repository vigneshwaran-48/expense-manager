"use client";

import { Expense } from '@/util/AppTypes'
import React, { useState } from 'react'
import { ExpenseColumn } from './ExpenseContainer';
import TrashIcon from '@/app/components/icon/TrashIcon';
import { useAppDispatch } from '@/lib/hooks';
import { addToast, ToastType } from '@/lib/features/toast/toastSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { deleteExpense } from '@/app/actions/expense';

const getDisplayTime = (date: string) => {
  const dateObj = new Date(date);
  if (dateObj.toDateString() !== new Date().toDateString()) {
    const year = new Date().getFullYear() !== dateObj.getFullYear() ? "" : dateObj.getFullYear();
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en", { "month": "long" })} ${year}`;
  }
  return `Today ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

const ExpenseRow = ({ expense, expenseColumns }: { expense: Expense, expenseColumns: ExpenseColumn[] }) => {

  const [deleting, setDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onDeleteExpense = async () => {
    setDeleting(true);
    const response = await deleteExpense(expense.id as string, expense.family?.id || null);

    if (response.status === 200) {
      dispatch(addToast({ id: getUniqueId(), message: response.message, type: ToastType.SUCCESS }));
    } else {
      dispatch(addToast({ id: getUniqueId(), message: response.error, type: ToastType.ERROR }));
    }
    setDeleting(false);
  }

  let openColumnValue = getDisplayTime(expense.time);
  switch (expenseColumns.find(column => column.selected === true)?.name) {
    case "Amount":
      openColumnValue = expense.amount + "";
      break;
    case "Date":
      openColumnValue = getDisplayTime(expense.time);
      break;
    case "Category":
      openColumnValue = expense.category?.name || "None";
      break;
    case "Owner":
      openColumnValue = expense.ownerName || "";
      break;
    default:
      console.error("No column value matched, Settings default date value");
      openColumnValue = getDisplayTime(expense.time);
  }
  return (
    <tr key={expense.id} className="even:bg-light-bg">
      <td className="pl-1 py-4 text-color-text">{expense.name}</td>
      <td className="py-4 hidden sm:table-cell">{expense.amount}</td>
      <td className="py-4 hidden sm:table-cell">{getDisplayTime(expense.time)}</td>
      <td className="py-4 hidden md:table-cell">{expense.category?.name || "None"}</td>
      <td className="py-4 hidden md:table-cell">{expense.ownerName}</td>
      <td className="py-4 md:hidden">{openColumnValue}</td>
      <td
        onClick={onDeleteExpense}
        className={`${deleting ? "text-light-text-color" : "text-red-500"} cursor-pointer`}
      ><TrashIcon /></td>
    </tr>
  )
}

export default ExpenseRow
