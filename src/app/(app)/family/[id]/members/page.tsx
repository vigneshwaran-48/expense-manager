import { getFamilyMembers } from "@/app/actions/family";
import React from "react";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const members = await getFamilyMembers(id);

  console.log(members);

  return (
    <div className="w-full h-full py-4 px-2 flex justify-center">
      <div className="bg-dark-bg text-light-color-text flex justify-between w-full h-full rounded p-2 max-w-[1130px] overflow-x-scroll hide-scrollbar">
        <p className="flex-grow px-2 min-w-[140px] max-w-[250px] md:min-w-[200px] flex-shrink-0">
          Name
        </p>
        <p className="px-2 min-w-[70px] md:min-w-[200px] flex-shrink-0">
          Date Joined
        </p>
        <p className="px-2 min-w-[70px] md:min-w-[200px] flex-shrink-0">
          Last Active
        </p>
        <p className="px-2 min-w-[70px] md:min-w-[200px] flex-shrink-0">Role</p>
      </div>
    </div>
  );
};

export default page;
