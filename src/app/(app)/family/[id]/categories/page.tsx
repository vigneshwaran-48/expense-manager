import CategoriesContainer from "@/app/(app)/categories/components/CategoriesContainer";
import CategoryProvider from "@/app/(app)/categories/components/CategoryProvider";
import { getAllCategories } from "@/app/actions/category";
import React from "react";

const page = async () => {
  const categories = await getAllCategories();
  return (
    <div className="w-full h-full">
      <CategoryProvider categories={categories} />
      <CategoriesContainer excludePersonal />
    </div>
  );
};

export default page;
