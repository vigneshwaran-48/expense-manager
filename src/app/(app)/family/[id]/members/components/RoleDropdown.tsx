"use client";

import Dropdown from "@/app/(app)/components/form/Dropdown";
import { Role } from "@/util/AppTypes";
import React, { useEffect, useState } from "react";

const RoleDropdown = ({ role }: { role: Role }) => {
  const [currentRole, setCurrentRole] = useState<Role>(role);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    setCurrentRole(role);
  }, [role]);

  const roleOptions = [
    {
      id: "leader-id",
      displayName: "Leader",
      value: "LEADER",
    },
    {
      id: "maintainer-id",
      displayName: "Maintainer",
      value: "MAINTAINER",
    },
    {
      id: "member-id",
      displayName: "Member",
      value: "MEMBER",
    },
  ];

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    setPending(true);
    // Update user role
    
  };

  return (
    <div className="w-[120px]">
      <Dropdown
        options={roleOptions}
        selectedOption={`${currentRole.toLowerCase()}-id`}
        onChange={(option) => handleRoleChange(option.value as Role)}
        pending={pending}
      />
    </div>
  );
};

export default RoleDropdown;
