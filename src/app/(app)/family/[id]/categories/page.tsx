import CategoriesContainer from "@/app/(app)/categories/components/CategoriesContainer";
import CategoryProvider from "@/app/(app)/categories/components/CategoryProvider";
import { getAllCategories } from "@/app/actions/category";
import React from "react";
import AddCategoryButton from "./components/AddCategoryButton";

const page = async () => {
  const categories = await getAllCategories();
  return (
    <div className="w-full h-full relative">
      <CategoryProvider categories={categories} />
      <CategoriesContainer excludePersonal />
      <AddCategoryButton />
    </div>
  );
};

export default page;
