"use client";

import { deleteCategory } from "@/app/actions/category";
import TrashIcon from "@/app/components/icon/TrashIcon";
import Spinner from "@/app/components/loader/Spinner";
import { removeCategory } from "@/lib/features/category/categorySlice";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const CategoryDeleteButton = ({ id }: { id: string }) => {
  const [pending, setPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDeleteCategory = async () => {
    setPending(true);
    const response = await deleteCategory(id);
    if (response.status === 200) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.SUCCESS,
          message: response.message,
        })
      );
    } else {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: response.error,
        })
      );
      return;
    }
    dispatch(removeCategory(id));
    setPending(false);
  };

  return (
    <span
      className="absolute top-[5px] right-[5px] cursor-pointer"
      onClick={handleDeleteCategory}
    >
      {pending ? (
        <Spinner className="w-[18px] h-[18px]" />
      ) : (
        <TrashIcon className="text-red-500" />
      )}
    </span>
  );
};

export default CategoryDeleteButton;
