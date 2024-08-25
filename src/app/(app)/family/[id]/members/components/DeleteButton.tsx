"use client";

import { removeMember } from "@/app/actions/family";
import TrashIcon from "@/app/components/icon/TrashIcon";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const DeleteButton = ({
  familyId,
  memberId,
}: {
  familyId: string;
  memberId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleRemoveMember = async () => {
    setLoading(true);
    const response = await removeMember(familyId, memberId);
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
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleRemoveMember}
      className={`px-2 py-1 rounded`}
      disabled={loading}
    >
      <TrashIcon
        className={`${loading ? "text-light-color-text" : "text-red-500"}`}
      />
    </button>
  );
};

export default DeleteButton;
