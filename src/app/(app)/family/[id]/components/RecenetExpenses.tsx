import { Expense } from '@/util/AppTypes'
import { getDisplayTime } from '@/util/timeUtil'
import React from 'react'

const RecenetExpenses = ({ expenses }: { expenses: Expense[] }) => {

  const expenseElems = expenses.map(expense => {
    return (
      <div key={expense.id} className="flex justify-between items-center p-2">
        <div>
          <h3 className="text-[18px] font-bold">{expense.name}</h3>
          <p className="text-light-color-text">{getDisplayTime(expense.time)}</p>
        </div>
        <p className="font-bold">{`${expense.currency} ${expense.amount}`}</p>
      </div>
    )
  })

  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl p-2">Recent Expenses</h2>
      <div>
        {expenseElems}
      </div>
    </div>
  )
}

export default RecenetExpenses
