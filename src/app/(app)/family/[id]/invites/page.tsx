import { getFamilyJoinRequests } from "@/app/actions/family";
import React from "react";
import JoinRequestContainer from "./components/JoinRequestContainer";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const joinRequests = await getFamilyJoinRequests(id);

  return (
    <div className="w-full h-full">
      <JoinRequestContainer requests={joinRequests} />
    </div>
  );
};

export default page;
