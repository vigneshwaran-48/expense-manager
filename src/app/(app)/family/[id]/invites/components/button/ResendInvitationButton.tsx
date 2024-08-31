"use client";

import { resendInvitation } from "@/app/actions/invitation";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const ResendInvitationButton = ({
  invitationId,
  familyId,
}: {
  invitationId: string;
  familyId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleResendInvitation = async () => {
    setLoading(true);
    const response = await resendInvitation(invitationId, familyId);
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
      onClick={handleResendInvitation}
      className={`px-2 py-1 rounded  ${
        loading ? "bg-light-bg text-light-color-text" : "bg-other-bg text-other-text"
      }`}
      disabled={loading}
    >
      Resend
    </button>
  );
};

export default ResendInvitationButton;
