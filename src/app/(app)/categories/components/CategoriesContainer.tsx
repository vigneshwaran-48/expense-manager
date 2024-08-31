"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";
import Category from "./Category";
import Image from "next/image";

const CategoriesContainer = ({ excludePersonal = false }) => {
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
            (filter === "FAMILY" && category.type === "FAMILY")) &&
          ((excludePersonal && category.type !== "PERSONAL") ||
            !excludePersonal)
      )
      .map((category) => <Category category={category} key={category.id} />);

  const isEmpty = categoryElems.length <= 0;

  return (
    <div
      className={`p-2 w-full h-[calc(100%-70px)] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 extra-lg:grid-cols-4 justify-items-center overflow-y-scroll hide-scrollbar ${
        isEmpty ? "flex items-center justify-center" : "grid"
      }`}
    >
      {!isEmpty ? (
        categoryElems
      ) : (
        <div className="flex flex-col font-bold justify-center">
          <Image
            src="/images/empty.png"
            alt="No categories illustration"
            width={150}
            height={150}
            className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]"
          />
          <p className="text-center">No Categories Here</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesContainer;
