import React from "react";
import Category from "./components/Category";
import { getAllCategories } from "@/app/actions/category";
import CategoryProvider from "./components/CategoryProvider";
import CategorySearchBar from "./components/CategorySearchBar";
import ShowCategoryCreationButton from "./components/ShowCategoryCreationButton";

const page = async () => {
  const categories = await getAllCategories();

  return (
    <div className="w-full h-full relative">
      <CategoryProvider categories={categories} />
      <div className="flex w-full justify-between p-2">
        <CategorySearchBar />
      </div>
      <div className="p-2 w-full h-[calc(100%-70px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 extra-lg:grid-cols-4 justify-items-center overflow-y-scroll hide-scrollbar">
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>
      <ShowCategoryCreationButton />
    </div>
  );
};

export default page;
