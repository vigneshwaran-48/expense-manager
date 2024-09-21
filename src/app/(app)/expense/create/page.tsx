import React from 'react'
import Title from '../../components/Title'
import ExpenseFormContainer from "./components/ExpenseFormContainer";

const page = () => {

  return (
    <div className="w-full h-full flex">
      <Title title="Create Expense" />
      <ExpenseFormContainer />
    </div>
  )
}

export default page
