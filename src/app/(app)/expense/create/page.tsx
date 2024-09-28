import React from 'react'
import Title from '../../components/Title'
import ExpenseFormContainer from "./components/ExpenseFormContainer";
import familySlice from '@/lib/features/family/familySlice';

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
