import React from 'react'
import Title from '../components/Title';
import { getAllExpenses } from '@/app/actions/expense';
import { NavLink } from '@/app/components/NavLink';

const getDisplayTime = (date: string) => {
  const dateObj = new Date(date);
  if (dateObj.toDateString() !== new Date().toDateString()) {
    const year = new Date().getFullYear() !== dateObj.getFullYear() ? "" : dateObj.getFullYear();
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en", { "month": "long" })} ${year}`;
  }
  return `Today ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

const page = async () => {

  const expenses = await getAllExpenses();

  const expenseElems = expenses && expenses.map(expense => {
    return (
      <tr key={expense.id}>
        <td className="py-4 text-color-text">{expense.name}</td>
        <td className="py-4">{expense.amount}</td>
        <td className="py-4">{getDisplayTime(expense.time)}</td>
        <td className="py-4">{expense.category?.name || "None"}</td>
        <td className="py-4">{expense.ownerName}</td>
      </tr>
    )
  });

  return (
    <div className="w-full h-full">
      <Title title="Expenses" />
      <div className="border-b flex items-center justify-end p-2 border-light-color-text">
        <NavLink href="/expense/create">
          <button className="py-1 px-2 rounded bg-other-bg text-other-text">Create</button>
        </NavLink>
      </div>
      <div className="w-full h-[calc(100%-55px)] rounded p-2 my-2 bg-dark-bg">
        <table className="border-collapse w-full text-light-color-text">
          <thead>
            <tr className="text-left">
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {expenseElems}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page;
