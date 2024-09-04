import React from 'react'
import Title from '../../components/Title'
import Image from 'next/image'
import ExpenseForm from './components/ExpenseForm'

const page = () => {

  return (
    <div className="w-full h-full flex">
      <Title title="Create Expense" />
      <div className="w-1/2 h-full flex flex-col">
        <ExpenseForm />
      </div>
      <div className="w-1/2 h-full">
        <Image src="/images/join-family.png" width={40} height={40} alt="Expense Illustration" />
      </div>
    </div>
  )
}

export default page
