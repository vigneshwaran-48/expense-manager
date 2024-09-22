"use client";

import AngleDown from '@/app/components/icon/AngleDown';
import TrashIcon from '@/app/components/icon/TrashIcon';
import { Expense } from '@/util/AppTypes'
import exp from 'constants';
import React, { useEffect, useRef, useState } from 'react'


const getDisplayTime = (date: string) => {
  const dateObj = new Date(date);
  if (dateObj.toDateString() !== new Date().toDateString()) {
    const year = new Date().getFullYear() !== dateObj.getFullYear() ? "" : dateObj.getFullYear();
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en", { "month": "long" })} ${year}`;
  }
  return `Today ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

const ExpenseContainer = ({ expenses }: { expenses: Expense[] }) => {

  const [expenseColumns, setExpenseColumns] = useState([
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

  const expenseElems = expenses && expenses.map(expense => {
    let openColumnValue = getDisplayTime(expense.time);
    switch (expenseColumns.find(column => column.selected === true)?.name) {
      case "Amount":
        openColumnValue = expense.amount + "";
        break;
      case "Date":
        openColumnValue = getDisplayTime(expense.time);
        break;
      case "Category":
        openColumnValue = expense.category?.name || "None";
        break;
      case "Owner":
        openColumnValue = expense.ownerName || "";
        break;
      default:
        console.error("No column value matched, Settings default date value");
        openColumnValue = getDisplayTime(expense.time);
    }
    return (
      <tr key={expense.id} className="even:bg-light-bg">
        <td className="pl-1 py-4 text-color-text">{expense.name}</td>
        <td className="py-4 hidden sm:table-cell">{expense.amount}</td>
        <td className="py-4 hidden sm:table-cell">{getDisplayTime(expense.time)}</td>
        <td className="py-4 hidden md:table-cell">{expense.category?.name || "None"}</td>
        <td className="py-4 hidden large-md:table-cell">{expense.ownerName}</td>
        <td className="py-4 large-md:hidden">{openColumnValue}</td>
        <td className="text-red-500 cursor-pointer"><TrashIcon /></td>
      </tr>
    )
  });

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
            <th className="py-2 hidden large-md:table-cell">Owner</th>
            <th className="py-2 relative large-md:hidden min-w-[35px]" ref={expenseColumnRef}>
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
