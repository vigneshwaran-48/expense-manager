"use client";
import FilterIcon from '@/app/components/icon/FilterIcon'
import { NavLink } from '@/app/components/NavLink'
import React, { useEffect, useRef, useState } from 'react'
import Searchbar from '../../components/Searchbar'
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuery, setSearchBy } from '@/lib/features/expense/expenseSlice';
import MultiLevelDropdown from '../../components/form/MultiLevelDropdown';
import { SearchBy } from '@/util/AppTypes';

interface Props {
  query?: string,
  searchBy?: SearchBy,
  isFamily?: boolean
}

const ExpenseListingHeader = ({ query: queryParam, searchBy: searchByParam, isFamily }: Props) => {

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = new URLSearchParams();
  const dispatch = useAppDispatch();
  const { query, searchBy } = useAppSelector(state => state.expenseSlice.search);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onEnter();
  }, [query, searchBy])

  useEffect(() => {
    if (searchByParam) {
      dispatch(setSearchBy(searchByParam))
    }
    if (queryParam) {
      dispatch(setQuery(queryParam));
    }
  }, [queryParam, searchByParam])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchend", handleOutsideClick);
    };
  }, []);

  const filterLists = [
    {
      displayName: "Search By",
      lists: [
        {
          id: "ALL",
          displayName: "All",
          onSelect: () => onSearchByChange("ALL"),
          selected: searchBy === "ALL"
        },
        {
          id: "NAME",
          displayName: "Name",
          onSelect: () => onSearchByChange("NAME"),
          selected: searchBy === "NAME"
        },
        {
          id: "DESCRIPTION",
          displayName: "Description",
          onSelect: () => onSearchByChange("DESCRIPTION"),
          selected: searchBy === "DESCRIPTION"
        },
        {
          id: "CATEGORY",
          displayName: "Category",
          onSelect: () => onSearchByChange("CATEGORY"),
          selected: searchBy === "CATEGORY"
        },
        {
          id: "OWNER",
          displayName: "Owner",
          onSelect: () => onSearchByChange("OWNER"),
          selected: searchBy === "OWNER"
        },
      ]
    }
  ]

  const handleQuery = (query: string) => {
    dispatch(setQuery(query));
  };

  const onSearchByChange = (searchBy: SearchBy) => {
    dispatch(setSearchBy(searchBy));
  }

  const onEnter = () => {
    const queryParams = new URLSearchParams(searchParams);
    if (query && query.trim().length > 0) {
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
        <div className="relative flex justify-center items-center" ref={filterRef}>
          <span
            className="text-other-bg border-2 border-other-bg p-1 sm:p-3 rounded mx-2 cursor-pointer"
            onClick={() => setOpenFilter(prev => !prev)}
          >
            <FilterIcon />
          </span>
          <MultiLevelDropdown listContainers={filterLists} open={openFilter} />
        </div>
      </div>
      <div className=" flex items-center justify-end p-2 border-light-color-text">
        <NavLink href={`/expense/create${isFamily ? "?family=true" : ""}`}>
          <button className="py-1 px-2 rounded bg-other-bg text-other-text">Create</button>
        </NavLink>
      </div>
    </div>
  )
}

export default ExpenseListingHeader
