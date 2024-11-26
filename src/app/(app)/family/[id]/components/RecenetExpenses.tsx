import { Expense } from '@/util/AppTypes'
import { getDisplayTime } from '@/util/timeUtil'
import Image from 'next/image'
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
    <div className="w-full m-2">
      <h2 className="font-bold text-2xl p-2">Recent Expenses</h2>
      {expenseElems.length === 0 ?
        <div className="flex flex-col font-bold justify-center items-center">
          <Image
            src="/images/empty.png"
            alt="No categories illustration"
            width={150}
            height={150}
            className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]"
          />
        </div>
        :

        <div className="p-2">
          {expenseElems}
        </div>
      }
    </div>
  )
}

export default RecenetExpenses
