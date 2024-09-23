import ExpenseContainer from '@/app/(app)/expense/components/ExpenseContainer';
import { getAllExpenses } from '@/app/actions/expense';
import React from 'react'

const page = async () => {

  const expenses = await getAllExpenses({
    isPersonal: false
  });
  return (
    <div className="w-full h-full bg-dark-bg rounded p-2 my-2">
      <ExpenseContainer expenses={expenses} />
    </div>
  )
}

export default page;
