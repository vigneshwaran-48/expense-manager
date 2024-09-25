import React from 'react'
import Title from '../components/Title';
import { getAllExpenses } from '@/app/actions/expense';
import ExpenseContainer from './components/ExpenseContainer';
import ExpenseListingHeader from './components/ExpenseListingHeader';
import { ExpenseFilter, SearchBy } from '@/util/AppTypes';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    searchBy?: SearchBy
  };
}) => {

  const filter: ExpenseFilter = {
    isPersonal: false
  }
  if (searchParams?.query) {
    filter.query = searchParams.query;
  }
  if (searchParams?.searchBy) {
    filter.searchBy = searchParams.searchBy;
  }
  const expenses = await getAllExpenses(filter);

  console.log("Server hit!");
  console.log(expenses)
  return (
    <div className="w-full h-full">
      <Title title="Expenses" />
      <ExpenseListingHeader />
      <div className="w-full h-[calc(100%-55px)] rounded p-2 my-2 bg-dark-bg">
        <ExpenseContainer data={expenses} />
      </div>
    </div>
  )
}

export default page;
