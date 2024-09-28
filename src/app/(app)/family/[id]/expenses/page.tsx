import Title from '@/app/(app)/components/Title';
import ExpenseContainer from '@/app/(app)/expense/components/ExpenseContainer';
import ExpenseListingHeader from '@/app/(app)/expense/components/ExpenseListingHeader';
import { getAllExpenses } from '@/app/actions/expense';
import { ExpenseFilter, SearchBy } from '@/util/AppTypes';
import React from 'react'

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
    isFamily: true
  }
  if (searchParams?.query) {
    filter.query = searchParams.query;
  }
  if (searchParams?.searchBy) {
    filter.searchBy = searchParams.searchBy;
  }
  const expenses = await getAllExpenses(filter);

  return (
    <div className="w-full h-full">
      <Title title="Expenses" />
      <ExpenseListingHeader
        isFamily={true}
        query={searchParams?.query}
        searchBy={searchParams?.searchBy} />
      <div className="w-full h-[calc(100%-55px)] rounded p-2 my-2 bg-dark-bg">
        <ExpenseContainer data={expenses} />
      </div>
    </div>
  )
}

export default page;
