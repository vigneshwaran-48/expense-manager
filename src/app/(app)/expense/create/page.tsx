import React from 'react'
import Title from '../../components/Title'
import ExpenseFormContainer from "./components/ExpenseFormContainer";

const page = ({
  searchParams
}: {
  searchParams?: {
    family?: boolean
  }
}) => {

  return (
    <div className="w-full h-full flex">
      <Title title="Create Expense" />
      <ExpenseFormContainer isFamily={searchParams?.family || false} />
    </div>
  )
}

export default page
