"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";
import Category from "./Category";

const CategoriesContainer = () => {
  const categories = useAppSelector((state) => state.categorySlice.categories);
  const searchQuery = useAppSelector(
    (state) => state.categorySlice.searchQuery
  );
  const filter = useAppSelector((state) => state.categorySlice.filter);

  const categoryElems =
    categories &&
    categories
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery) &&
          (filter === "ALL" ||
            (filter === "PERSONAL" && category.type === "PERSONAL") ||
            (filter === "FAMILY" && category.type === "FAMILY"))
      )
      .map((category) => <Category category={category} key={category.id} />);

  return <div>{categoryElems}</div>;
};

export default CategoriesContainer;
