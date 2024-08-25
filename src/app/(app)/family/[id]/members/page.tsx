import { getFamilyMembers, getUserRoleInFamily } from "@/app/actions/family";
import React from "react";
import Member from "./components/Member";
import { FamilyMember, Role, User } from "@/util/AppTypes";

interface Props {
  params: { id: string };
}

const page = async ({ params: { id } }: Props) => {
  const [members, currentUserRole]: [FamilyMember[], Role] = await Promise.all([
    getFamilyMembers(id),
    getUserRoleInFamily(id),
  ]);

  const memberElems = members.map((member) => (
    <Member
      member={member}
      key={member.id}
      currentUserRole={currentUserRole as Role}
    />
  ));

  return (
    <div className="w-full h-full py-4 sm:px-2 flex justify-center">
      <div className="bg-dark-bg text-light-color-text w-full h-full rounded p-2 overflow-x-scroll hide-scrollbar">
        <table className="border-collapse w-full">
          <thead>
            <tr className="text-left">
              <th className="w-[250px] lg:w-[300px]">Name</th>
              <th className="hidden lg:table-cell">Date Joined</th>
              <th
                className={`${
                  currentUserRole === "LEADER" ? "hidden sm:table-cell" : ""
                }`}
              >
                Last Accessed
              </th>
              {currentUserRole === "LEADER" ? <th>Role</th> : ""}
            </tr>
          </thead>
          <tbody>{memberElems}</tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
