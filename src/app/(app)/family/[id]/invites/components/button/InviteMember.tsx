import { inviteMember } from "@/app/actions/family";
import { removeUser } from "@/lib/features/invite/inviteMemberSlice";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useState } from "react";

const InviteMember = ({
  memberId,
  familyId,
}: {
  memberId: string;
  familyId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleAcceptRequest = async () => {
    setLoading(true);
    const response = await inviteMember(familyId, memberId, "MEMBER");
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
    dispatch(removeUser(memberId));
    setLoading(false);
  };

  return (
    <button
      onClick={handleAcceptRequest}
      className={`px-2 py-1 rounded  ${
        loading
          ? "bg-light-bg text-light-color-text"
          : "bg-other-bg text-other-text"
      }`}
      disabled={loading}
    >
      {loading ? "Inviting ..." : "Invite"}
    </button>
  );
};

export default InviteMember;
