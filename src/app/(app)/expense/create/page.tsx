import React from 'react'
import Title from '../../components/Title'
import Image from 'next/image'
import ExpenseForm from './components/ExpenseForm'

const page = () => {

  return (
    <div className="w-full h-full flex">
      <Title title="Create Expense" />
      <div className="w-full h-[calc(100%-40px)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 h-full flex flex-col">
          <ExpenseForm isFamilyExpense={false} />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <Image src="/images/join-family.png" width={40} height={40} alt="Expense Illustration" />
        </div>
      </div>
    </div>
  )
}

export default page
