import Dropdown from "@/app/(app)/components/form/Dropdown";
import TrashIcon from "@/app/components/icon/TrashIcon";
import { FamilyMember } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";
import RoleDropdown from "./RoleDropdown";

const Member = ({ member }: { member: FamilyMember }) => {
  return (
    <tr>
      <td className="w-[250px] py-2">
        <div className="flex items-center">
          <Image
            src={member.member.image || "/person.jpg"}
            width={35}
            height={35}
            alt={`${member.member.name}'s image`}
            className="rounded-full w-[35px] h-[35px] mr-2"
          />
          <div className="flex flex-col">
            <h4 className="text-[14px] sm:text-[16px] font-medium text-color-text">
              {member.member.name}
            </h4>
            <p className="text-[12px] hidden md:block">{member.member.email}</p>
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell py-2">May 02, 2024</td>
      <td className="hidden sm:table-cell py-2">Aug 11, 2024</td>
      <td>
        <RoleDropdown role={member.role} />
      </td>
      <td className="px-2 py-2">
        <TrashIcon className="text-red-500" />
      </td>
    </tr>
  );
};

export default Member;
