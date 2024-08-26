"use client";

import { revokeInvitation } from "@/app/actions/invitation";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const RevokeInvitationButton = ({
  invitationId,
  familyId,
}: {
  invitationId: string;
  familyId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleRevokeInvitation = async () => {
    setLoading(true);
    const response = await revokeInvitation(invitationId, familyId);
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
      onClick={handleRevokeInvitation}
      className={`px-2 py-1 rounded  ${
        loading ? "bg-light-bg text-light-color-text" : "bg-red-500 text-white"
      }`}
      disabled={loading}
    >
      Revoke
    </button>
  );
};

export default RevokeInvitationButton;
