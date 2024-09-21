"use client";

import ShowCategoryCreationButton from "@/app/(app)/categories/components/ShowCategoryCreationButton";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const AddCategoryButton = () => {
  const familyRole = useAppSelector((state) => state.familySlice.role);

  return familyRole === "LEADER" || familyRole === "MAINTAINER" ? (
    <ShowCategoryCreationButton />
  ) : (
    ""
  );
};

export default AddCategoryButton;
