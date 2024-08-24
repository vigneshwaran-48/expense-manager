"use client";

import { requestForJoining } from "@/app/actions/family";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const JoinButton = ({
  id,
  isRequestExists,
}: {
  id: string;
  isRequestExists: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleJoinFamily = async () => {
    setLoading(true);
    const data = await requestForJoining(id);
    if (data.status === 200) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.SUCCESS,
          message: data.message,
        })
      );
    } else {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: data.error,
        })
      );
    }
    setLoading(false);
  };

  return isRequestExists ? (
    <p className="p-2  text-light-color-text">Requested</p>
  ) : (
    <button
      onClick={handleJoinFamily}
      className="button bg-other-bg text-other-text text-[16px] h-fit"
      disabled={isRequestExists || loading}
    >
      {loading ? "Requesting ..." : "Join"}
    </button>
  );
};

export default JoinButton;
