"use client";

import { rejectJoinRequest } from "@/app/actions/family";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const RejectRequestButton = ({
  familyId,
  requestId,
}: {
  familyId: string;
  requestId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleAcceptRequest = async () => {
    setLoading(true);
    const response = await rejectJoinRequest(familyId, requestId);
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
      onClick={handleAcceptRequest}
      className={`px-2 py-1 rounded bg-red-500 text-white ${
        loading ? "bg-light-bg text-light-color-text" : ""
      }`}
      disabled={loading}
    >
      Reject
    </button>
  );
};

export default RejectRequestButton;
