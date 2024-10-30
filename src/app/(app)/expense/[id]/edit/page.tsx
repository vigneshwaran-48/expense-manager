import Title from '@/app/(app)/components/Title'
import React from 'react'
import ExpenseFormContainer from '../../create/components/ExpenseFormContainer'
import { getExpense } from '@/app/actions/expense';
import { SetExpense } from './components/SetExpense';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const expense = await getExpense(id);
  return (
    <div className="w-full h-full flex">
      <Title title="Edit Expense" />
      <SetExpense expense={expense} />
      <ExpenseFormContainer isEdit expenseId={id} />
    </div>
  )
}


export default page
