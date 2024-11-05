"use client";

import Dropdown, { Option } from '@/app/(app)/components/form/Dropdown'
import { Role } from '@/util/AppTypes';
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

const PermissionRoleDropdown = ({ inviteAcceptRequestRoles, displayName }: { inviteAcceptRequestRoles: Role[], displayName: string }) => {

  const [loading, setLoading] = useState<boolean>(false);

  const handleRoleChange = (option: Option) => {

  }

  return (
    <div className="flex w-full justify-between items-center p-2">
      <b><label>{displayName}</label></b>
      <Dropdown
        className={"bg-dark-bg w-full flex justify-between max-w-[200px] ml-2 p-2"}
        options={roleOptions}
        selectedOption={`${getLeastRole(inviteAcceptRequestRoles)}-id`}
        onChange={handleRoleChange}
        ulClass={"bg-dark-bg"}
        listHoverBg={"hover:border-b hover:border-light-text"}
        pending={loading}
      />
    </div>
  )
}

export default PermissionRoleDropdown
