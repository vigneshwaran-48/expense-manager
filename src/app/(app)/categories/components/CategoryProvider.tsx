"use client";

import { setCategories } from "@/lib/features/category/categorySlice";
import { useAppDispatch } from "@/lib/hooks";
import { Category } from "@/util/AppTypes";
import React, { useEffect } from "react";

const CategoryProvider = ({ categories }: { categories: Category[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);

  return <></>;
};

export default CategoryProvider;
