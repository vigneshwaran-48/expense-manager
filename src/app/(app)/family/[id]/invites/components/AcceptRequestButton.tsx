"use client";

import { acceptJoinRequest } from "@/app/actions/family";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const AcceptRequestButton = ({
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
    const response = await acceptJoinRequest(familyId, requestId);
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
      className={`px-2 py-1 rounded bg-other-bg text-other-text ${
        loading ? "bg-light-bg text-light-color-text" : ""
      }`}
      disabled={loading}
    >
      Accept
    </button>
  );
};

export default AcceptRequestButton;
