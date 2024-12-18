import React from "react";
import { getAllCategories } from "@/app/actions/category";
import CategoryProvider from "./components/CategoryProvider";
import CategorySearchBar from "./components/CategorySearchBar";
import ShowCategoryCreationButton from "./components/ShowCategoryCreationButton";
import CategoriesContainer from "./components/CategoriesContainer";
import Title from "../components/Title";

const page = async () => {
  const categories = await getAllCategories();

  return (
    <div className="w-full h-full relative">
      <Title title={"Category"} />
      <CategoryProvider categories={categories} />
      <div className="flex w-full justify-between p-2 my-2">
        <CategorySearchBar />
      </div>
      <CategoriesContainer />
      <ShowCategoryCreationButton />
    </div>
  );
};

export default page;
