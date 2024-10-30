"use client"

import XIcon from '@/app/components/icon/XIcon';
import { setExpensePopup } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React from 'react'

const ExpensePopup = () => {

  const { show, expense } = useAppSelector(state => state.expenseSlice.expensePopup);
  const dispatch = useAppDispatch();

  const closePopup = () => {
    dispatch(setExpensePopup({ show: false, expense }));
  }

  return (
    <div className={`fixed w-full h-full  z-30 justify-center items-center ${show ? "flex" : "hidden"}`}>
      <div className="w-full h-full bg-black opacity-[0.7] absolute">
      </div>
      <div className="max-w-[600px] w-[95%] bg-light-bg absolute p-2 rounded">
        <span className="absolute top-1 right-1 p-2 cursor-pointer" onClick={closePopup}>
          <XIcon />
        </span>
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
      </div>
    </div>
  )
}

export default ExpensePopup
