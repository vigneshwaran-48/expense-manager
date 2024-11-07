"use client";

import Dropdown, { Option } from '@/app/(app)/components/form/Dropdown'
import { updateRole } from '@/app/actions/family';
import { addToast, ToastType } from '@/lib/features/toast/toastSlice';
import { useAppDispatch } from '@/lib/hooks';
import { FamilyRoleSettings, Role } from '@/util/AppTypes';
import { getUniqueId } from '@/util/getUniqueId';
import React, { useState } from 'react'

const roleOptions = [
  {
    id: "MEMBER-id",
    value: "MEMBER",
    displayName: "Anyone"
  },
  {
    id: "MAINTAINER-id",
    value: "MAINTAINER",
    displayName: "Maintainer & Leader"
  },
  {
    id: "LEADER-id",
    value: "LEADER",
    displayName: "Leader"
  },
]

const getLeastRole = (roles: Role[]): Role => {
  if (roles.length == 1) {
    return "LEADER";
  } else if (roles.length == 2) {
    return "MAINTAINER";
  } else {
    return "MEMBER"
  }
}

const PermissionRoleDropdown = ({ familyId, roles, displayName, settingRole, onChange }:
  { familyId: string, roles: Role[], displayName: string, settingRole: FamilyRoleSettings, onChange: (roles: Role[]) => void }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleRoleChange = async (option: Option) => {
    setLoading(true);
    if (option.value === "MEMBER") {
      roles = ["LEADER", "MAINTAINER", "MEMBER"];
    } else if (option.value === "MAINTAINER") {
      roles = ["LEADER", "MAINTAINER"];
    } else if (option.value === "LEADER") {
      roles = ["LEADER"];
    } else {
      throw new Error("Unknown role option!");
    }
    const response = await updateRole(familyId, settingRole, roles);
    if (response.status === 200) {
      dispatch(addToast({ id: getUniqueId(), message: response.message, type: ToastType.SUCCESS }));
    } else {
      dispatch(addToast({ id: getUniqueId(), message: response.error, type: ToastType.ERROR }));
    }
    setLoading(false);
  }

  return (
    <div className="flex w-full justify-between items-center p-2">
      <b><label>{displayName}</label></b>
      <Dropdown
        className={"bg-dark-bg w-full flex justify-between max-w-[200px] ml-2 p-2"}
        options={roleOptions}
        selectedOption={`${getLeastRole(roles)}-id`}
        onChange={handleRoleChange}
        ulClass={"bg-dark-bg"}
        listHoverBg={"hover:border-b hover:border-light-text"}
        pending={loading}
      />
    </div>
  )
}

export default PermissionRoleDropdown
