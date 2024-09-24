"use client";

import FilterIcon from '@/app/components/icon/FilterIcon'
import { NavLink } from '@/app/components/NavLink'
import React, { useEffect, useState } from 'react'
import Searchbar from '../../components/Searchbar'
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuery } from '@/lib/features/expense/expenseSlice';

const ExpenseListingHeader = () => {

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = new URLSearchParams();
  const dispatch = useAppDispatch();
  const { query, searchBy } = useAppSelector(state => state.expenseSlice.search);

  const handleQuery = (query: string) => {
    dispatch(setQuery(query));
  };

  const onEnter = () => {
    const queryParams = new URLSearchParams(searchParams);
    if (query) {
      queryParams.set("query", query);
      queryParams.set("page", "1");
      queryParams.set("searchBy", searchBy);
    } else {
      queryParams.delete("query");
      queryParams.delete("page");
      queryParams.delete("searchBy");
    }
    replace(`${pathname}?${queryParams.toString()}`);
  }

  return (
    <div className="flex w-full justify-between p-2 border-b">
      <div className="flex items-center">
        <Searchbar id="expense-search-id" defaultValue={query} name="search" onChange={handleQuery} onEnter={onEnter} />
        <span className="text-other-bg border-2 border-other-bg p-1 sm:p-3 rounded mx-2 cursor-pointer">
          <FilterIcon />
        </span>
      </div>
      <div className=" flex items-center justify-end p-2 border-light-color-text">
        <NavLink href="/expense/create">
          <button className="py-1 px-2 rounded bg-other-bg text-other-text">Create</button>
        </NavLink>
      </div>
    </div>
  )
}

export default ExpenseListingHeader
