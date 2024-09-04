"use client";

import Dropdown from '@/app/(app)/components/form/Dropdown';
import { setExpenseCreationForm } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { countries } from '@/util/countries';
import React from 'react'

const options = countries.map(country => {
  return {
    id: `${country.code}-id`,
    displayName: country.code,
    value: country.code
  }
})
const ExpenseForm = () => {

  const creationForm = useAppSelector(state => state.expenseSlice.creationForm);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setExpenseCreationForm({ ...creationForm, [name]: value }));
  }

  const handleNewValue = (name: string, value: string) => {
    dispatch(setExpenseCreationForm({ ...creationForm, [name]: value }));
  }

  return (
    <div className="w-full h-full flex flex-col p-2 my-2 overflow-y-scroll hide-scrollbar">
      <div className="w-full flex justify-between items-center my-2">
        <label className="text-[18px] text-light-color-text w-1/4" >Subject</label>
        <input className="outline-none border-none rounded bg-dark-bg p-2 text-[18px] w-3/4" name="subject" value={creationForm.subject} onChange={handleChange} />
      </div>
      <div className="w-full flex justify-between items-center my-2">
        <label className="text-[18px] text-light-color-text w-1/4" >Date</label>
        <input type="date" name="date" value={creationForm.date} onChange={handleChange} className="bg-dark-bg p-2 rounded w-3/4" />
      </div>
      <div className="w-full flex justify-between items-center my-2">
        <label className="text-[18px] text-light-color-text w-1/4" >Amount</label>
        <div className="w-3/4 flex items-center">
          <input className="outline-none border-none rounded bg-dark-bg p-2 text-[18px] w-3/4" name="subject" value={creationForm.subject} onChange={handleChange} />
          <Dropdown className={"bg-dark-bg mx-2 p-2 w-[76px]"} options={options} selectedOption={`${creationForm.currency}-id`} onChange={option => handleNewValue("currency", option.value)} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseForm
