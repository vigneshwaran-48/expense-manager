"use client";

import Dropdown from "@/app/(app)/components/form/Dropdown";
import { changeMemberRole } from "@/app/actions/family";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Role } from "@/util/AppTypes";
import { getUniqueId } from "@/util/getUniqueId";
import React, { useEffect, useState } from "react";

const RoleDropdown = ({
  role,
  familyId,
  memberId,
}: {
  role: Role;
  familyId: string;
  memberId: string;
}) => {
  const [currentRole, setCurrentRole] = useState<Role>(role);
  const [pending, setPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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

  const handleRoleChange = async (role: Role) => {
    setCurrentRole(role);
    setPending(true);
    await changeMemberRole(familyId, memberId, currentRole);
    dispatch(
      addToast({
        id: getUniqueId(),
        type: ToastType.SUCCESS,
        message: "Changed member role!",
      })
    );
    setPending(false);
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