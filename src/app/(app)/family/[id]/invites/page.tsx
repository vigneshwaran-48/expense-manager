import {
  getFamilyJoinRequests,
  getUserRoleInFamily,
} from "@/app/actions/family";
import React from "react";
import JoinRequestContainer from "./components/JoinRequestContainer";
import { JoinRequest, Role } from "@/util/AppTypes";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const [joinRequests, curentUserRole]: [JoinRequest[], Role] =
    await Promise.all([getFamilyJoinRequests(id), getUserRoleInFamily(id)]);

  return (
    <div className="w-full h-full">
      <JoinRequestContainer
        requests={joinRequests}
        currentUserRole={curentUserRole}
      />
    </div>
  );
};

export default page;
