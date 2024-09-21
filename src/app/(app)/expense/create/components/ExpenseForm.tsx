"use client";

import Dropdown from '@/app/(app)/components/form/Dropdown';
import { NOT_SELECTED_CATEGORY_ID, setExpenseCreationForm } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Category } from '@/util/AppTypes';
import { countries } from '@/util/countries';
import React from 'react'

const options = countries.map(country => {
  return {
    id: `${country.code}-id`,
    displayName: country.code,
    value: country.code
  }
})
const ExpenseForm = ({ isFamilyExpense }: { isFamilyExpense: boolean }) => {

  const categories = useAppSelector(state => state.categorySlice.categories);
  const creationForm = useAppSelector(state => state.expenseSlice.creationForm);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setExpenseCreationForm({ ...creationForm, [name]: value }));
  }

  const handleNewValue = (name: string, value: string | Category | undefined) => {
    dispatch(setExpenseCreationForm({ ...creationForm, [name]: value }));
  }

  const categoryOptions = categories.filter(category => isFamilyExpense || category.type === "PERSONAL")
    .map(category => ({ id: category.id as string, displayName: category.name, value: category.name }));

  categoryOptions.push({ id: NOT_SELECTED_CATEGORY_ID, displayName: "---", value: "not-selected" })

  return (
    <div className="w-full h-full flex flex-col p-2 my-4 overflow-y-scroll hide-scrollbar">
      <div className="w-full flex justify-between items-center my-4">
        <label className="text-[18px] text-light-color-text w-1/4" >Name</label>
        <input className="outline-none border-none rounded bg-dark-bg p-2 text-[18px] w-3/4" name="name" value={creationForm.name} onChange={handleChange} />
      </div>
      <div className="w-full flex justify-between items-center my-4">
        <label className="text-[18px] text-light-color-text w-1/4" >Date</label>
        <input type="datetime-local" name="date" value={creationForm.date} onChange={handleChange} className="bg-dark-bg p-4 rounded w-3/4 max-w-[240px] outline-none" />
      </div>
      <div className="w-full flex justify-between items-center my-4">
        <label className="text-[18px] text-light-color-text w-1/4" >Amount</label>
        <div className="w-3/4 flex items-center justify-between">
          <input className="outline-none border-none rounded bg-dark-bg p-2 text-[18px] w-3/4" type="number" name="amount" value={creationForm.amount} onChange={handleChange} />
          <Dropdown
            className={"bg-dark-bg ml-2 p-2 w-[76px]"}
            options={options}
            selectedOption={`${creationForm.currency}-id`}
            onChange={option => handleNewValue("currency", option.value)}
            ulClass={"bg-dark-bg"}
            listHoverBg={"hover:border-b hover:border-light-text"}
          />
        </div>
      </div>
      {
        categoryOptions && categoryOptions.length > 0 ?
          <div className="w-full flex justify-between items-center my-4">
            <label className="text-[18px] text-light-color-text w-1/4">Category</label>
            <Dropdown
              className={"bg-dark-bg w-full flex justify-between max-w-[200px] ml-2 p-2"}
              options={categoryOptions}
              selectedOption={creationForm.categoryId || NOT_SELECTED_CATEGORY_ID}
              onChange={option => handleNewValue("categoryId", option.id)}
              ulClass={"bg-dark-bg"}
              listHoverBg={"hover:border-b hover:border-light-text"}
            />
          </div>
          : <></>
      }
      <div className="flex w-full justify-between my-4">
        <label htmlFor="expense-description" className="text-[18px] text-light-color-text mr-2 sm:mr-none sm:w-1/4">Description</label>
        <textarea name="description" id="expense-description" className="bg-dark-bg outline-none sm:w-3/4 p-2 rounded resize-none h-[150px]" value={creationForm.description} onChange={e => handleNewValue("description", e.target.value)} />
      </div>
    </div>
  )
}

export default ExpenseForm
