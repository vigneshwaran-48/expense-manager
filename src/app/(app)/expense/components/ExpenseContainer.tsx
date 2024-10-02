"use client";

import AngleDown from '@/app/components/icon/AngleDown';
import TrashIcon from '@/app/components/icon/TrashIcon';
import { setExpenses } from '@/lib/features/expense/expenseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Expense } from '@/util/AppTypes'
import React, { useEffect, useRef, useState } from 'react'
import ExpenseRow from './ExpenseRow';

export type ExpenseColumn = {
  name: string,
  selected: boolean
}

const ExpenseContainer = ({ data }: { data: Expense[] }) => {

  const [expenseColumns, setExpenseColumns] = useState<ExpenseColumn[]>([
    {
      name: "Amount",
      selected: false
    },
    {
      name: "Date",
      selected: false
    },
    {
      name: "Category",
      selected: false
    },
    {
      name: "Owner",
      selected: true
    }
  ]);

  const expenseColumnRef = useRef<HTMLTableHeaderCellElement>(null);

  const [openExpenseColumnDropdown, setOpenExpenseColumnDropdown] = useState<boolean>(false);

  const expenses = useAppSelector(state => state.expenseSlice.expenses);

  const dispatch = useAppDispatch();

  const { query, searchBy } = useAppSelector(state => state.expenseSlice.search);

  useEffect(() => {
    dispatch(setExpenses(data))
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        expenseColumnRef.current &&
        !expenseColumnRef.current.contains(e.target as Node)
      ) {
        setOpenExpenseColumnDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    };
  }, []);


  const expenseElems = expenses && expenses.filter(expense => {
    if (searchBy === "ALL") {
      return expense.name.toLowerCase().includes(query.toLowerCase());
    } else if (searchBy === "OWNER") {
      return expense.ownerName?.toLowerCase().includes(query.toLowerCase());
    } else if (searchBy === "CATEGORY") {
      return expense.category
        && expense.category.name.toLowerCase().includes(query.toLowerCase());
    } else if (searchBy === "NAME") {
      return expense.name.toLowerCase().includes(query.toLowerCase());
    } else if (searchBy === "DESCRIPTION") {
      return expense.description.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  }).map(expense => <ExpenseRow expense={expense} expenseColumns={expenseColumns} />);

  const onExpenseColumnSelect = (name: string) => {
    setExpenseColumns(prevColumns => {
      return prevColumns.map(column => {
        column.selected = column.name === name;
        return column;
      })
    });
    setOpenExpenseColumnDropdown(false);
  }

  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar">
      <table className="border-collapse w-full text-light-color-text">
        <thead className="sticky top-0 bg-dark-bg">
          <tr className="text-left">
            <th className="py-2">Name</th>
            <th className="py-2 hidden sm:table-cell">Amount</th>
            <th className="py-2 hidden sm:table-cell">Date</th>
            <th className="py-2 hidden md:table-cell">Category</th>
            <th className="py-2 hidden md:table-cell">Owner</th>
            <th className="py-2 relative md:hidden min-w-[35px]" ref={expenseColumnRef}>
              <div
                className="w-full flex items-center justify-between cursor-pointer max-w-[150px]"
                onClick={() => setOpenExpenseColumnDropdown(prevValue => !prevValue)}>
                <p>{expenseColumns.find(expense => expense.selected === true)?.name}</p>
                <AngleDown />
              </div>
              <ul className={`max-w-[150px] w-fit sm:w-full max-sm:right-0 transition origin-top bg-light-bg duration-500 absolute top-[107%] ${openExpenseColumnDropdown ? "" : "scale-y-0"}`}>
                {expenseColumns.filter(column => column.selected === false)
                  .map(column => <li
                    className="p-2 hover:bg-dark-bg hover:text-color-text cursor-pointer"
                    key={column.name}
                    onClick={() => onExpenseColumnSelect(column.name)}
                  >{column.name}</li>)}
              </ul>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenseElems}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseContainer
