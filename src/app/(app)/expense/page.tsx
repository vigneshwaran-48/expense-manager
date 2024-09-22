import React from 'react'
import Title from '../components/Title';
import { getAllExpenses } from '@/app/actions/expense';
import { NavLink } from '@/app/components/NavLink';
import ExpenseContainer from './components/ExpenseContainer';

const page = async () => {

  const expenses = await getAllExpenses();

  return (
    <div className="w-full h-full">
      <Title title="Expenses" />
      <div className="border-b flex items-center justify-end p-2 border-light-color-text">
        <NavLink href="/expense/create">
          <button className="py-1 px-2 rounded bg-other-bg text-other-text">Create</button>
        </NavLink>
      </div>
      <div className="w-full h-[calc(100%-55px)] rounded p-2 my-2 bg-dark-bg">
        <ExpenseContainer expenses={expenses} />
      </div>
    </div>
  )
}

export default page;
