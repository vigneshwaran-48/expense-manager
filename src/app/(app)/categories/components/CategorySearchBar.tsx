"use client";

import React from "react";
import Searchbar from "../../components/Searchbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/features/category/categorySlice";

const CategorySearchBar = () => {
  const query = useAppSelector((state) => state.categorySlice.searchQuery);
  const dispatch = useAppDispatch();
  return (
    <Searchbar
      id="category-search-id"
      name="categoryQuery"
      onChange={(query) => dispatch(setSearchQuery(query))}
      defaultValue={query}
    />
  );
};

export default CategorySearchBar;
