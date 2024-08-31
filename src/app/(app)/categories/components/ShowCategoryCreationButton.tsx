"use client";

import Plus from "@/app/components/icon/Plus";
import { showCreatePage } from "@/lib/features/category/categorySlice";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";

const ShowCategoryCreationButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(showCreatePage())}
      className="p-2 bg-other-bg text-other-text absolute bottom-5 right-2 sm:right-5 z-30 rounded-full"
    >
      <Plus className="w-[30px] h-[30px]" />
    </button>
  );
};

export default ShowCategoryCreationButton;
