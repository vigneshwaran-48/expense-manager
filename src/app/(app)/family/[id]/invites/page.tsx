import { getFamilyJoinRequests } from "@/app/actions/family";
import React from "react";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const joinRequests = await getFamilyJoinRequests(id);

  console.log(joinRequests);

  return <div>page</div>;
};

export default page;
