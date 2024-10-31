"use client"

import { setExpensePopup } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation';
import React from 'react'

const ExpensePopup = () => {

  const { show, expense, canEdit } = useAppSelector(state => state.expenseSlice.expensePopup);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const closePopup = () => {
    dispatch(setExpensePopup({ show: false, expense, canEdit: false }));
  }

  const editExpense = () => {
    router.push(`/expense/${expense?.id}/edit`)
    closePopup();
  }

  return (
    <div className={`fixed w-full h-full  z-30 justify-center items-center ${show ? "flex" : "hidden"}`}>
      <div className="w-full h-full bg-black opacity-[0.7] absolute">
      </div>
      <div className="max-w-[600px] w-[95%] bg-light-bg absolute p-2 rounded">
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Name</p>
          <p className="rounded p-2 w-2/4 sm:w-3/4 font-bold sm:text-[18px]">{expense?.name || "Taxi"}</p>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Description</p>
          <p className="rounded p-2 text-[18px] w-2/4 sm:w-3/4 font-bold">{expense?.description || "Taxi"}</p>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Amount</p>
          <p className="rounded p-2 text-[18px] w-2/4 sm:w-3/4 font-bold">{(expense?.amount || "0") + " " + (expense?.currency || "USD")}</p>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Time</p>
          <p className="rounded p-2 text-[18px] w-2/4 sm:w-3/4 font-bold">{expense?.time || "0"}</p>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Owner</p>
          <p className="rounded p-2 text-[18px] w-2/4 sm:w-3/4 font-bold">{expense?.ownerName || "None"}</p>
        </div>
        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-2/4 sm:w-1/4 px-2" >Category</p>
          <p className="rounded p-2 text-[18px] w-2/4 sm:w-3/4 font-bold">{expense?.category ? expense.category.name : "None"}</p>
        </div>
        <div className="w-full flex items-center my-4 justify-end">
          {
            canEdit ?
              <button className="bg-other-bg text-other-text px-4 py-1 rounded mx-2 outline-none" onClick={editExpense}>Edit</button>
              : ""
          }
          <button className="px-2 py-1 rounded text-light-color-text border-dark-bg border mx-2 outline-none" onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ExpensePopup
