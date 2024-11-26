import Title from '@/app/(app)/components/Title'
import React from 'react'
import ExpenseFormContainer from '../../create/components/ExpenseFormContainer'
import { getExpense } from '@/app/actions/expense';
import { Expense } from '@/util/AppTypes';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const expense: Expense = await getExpense(id);
  console.log(expense.family)
  return (
    <div className="w-full h-full flex">
      <Title title="Edit Expense" />
      <ExpenseFormContainer isFamily={expense.family !== undefined && expense.family !== null} isEdit expense={expense} />
    </div>
  )
}


export default page
