"use client";

import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setShowMembersInviteContainer } from "@/lib/features/invite/inviteMemberSlice";

const InviteMemberButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="px-4 py-1 rounded bg-other-bg text-other-text m-2"
      onClick={() => dispatch(setShowMembersInviteContainer(true))}
    >
      Invite
    </button>
  );
};

export default InviteMemberButton;
