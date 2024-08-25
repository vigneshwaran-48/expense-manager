import {
  getAllInvitationsOfFamily,
  getFamilyJoinRequests,
  getUserRoleInFamily,
} from "@/app/actions/family";
import React from "react";
import JoinRequestContainer from "./components/JoinRequestContainer";
import { Invitation, JoinRequest, Role } from "@/util/AppTypes";
import InvitesContainer from "./components/InvitesContainer";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const [joinRequests, curentUserRole, invitations]: [
    JoinRequest[],
    Role,
    Invitation[]
  ] = await Promise.all([
    getFamilyJoinRequests(id),
    getUserRoleInFamily(id),
    getAllInvitationsOfFamily(id),
  ]);

  return (
    <div className="w-full h-full flex flex-col">
      <InvitesContainer
        invitations={invitations}
        currentUserRole={curentUserRole}
        familyId={id}
      />
      <JoinRequestContainer
        requests={joinRequests}
        currentUserRole={curentUserRole}
      />
    </div>
  );
};

export default page;
