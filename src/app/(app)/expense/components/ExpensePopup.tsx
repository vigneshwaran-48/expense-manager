"use client"

import { useAppSelector } from '@/lib/hooks'
import React from 'react'

const ExpensePopup = () => {

  const { show, expense } = useAppSelector(state => state.expenseSlice.expensePopup);

  return (
    <div className={`fixed w-full h-full  z-30 justify-center items-center ${show ? "flex" : "hidden"}`}>
      <div className="w-full h-full bg-black opacity-[0.7] absolute">
      </div>
      <div className="max-w-[400px] w-full bg-light-bg absolute p-2 rounded">

        <div className="w-full flex justify-between items-center my-4">
          <p className="text-[18px] text-light-color-text w-1/4" >Name</p>
          <p className="rounded p-2 text-[18px] w-3/4 font-bold">{expense?.name || "Taxi"}</p>
        </div>
      </div>
    </div>
  )
}

export default ExpensePopup
