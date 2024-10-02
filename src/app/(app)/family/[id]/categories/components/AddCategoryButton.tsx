"use client";

import ShowCategoryCreationButton from "@/app/(app)/categories/components/ShowCategoryCreationButton";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const AddCategoryButton = () => {
  const familyRole = useAppSelector((state) => state.familySlice.role);
  const categoryRoles = useAppSelector(state => state.familySlice.settings.categoryRoles);

  return categoryRoles.includes(familyRole) ? (
    <ShowCategoryCreationButton />
  ) : (
    ""
  );
};

export default AddCategoryButton;
