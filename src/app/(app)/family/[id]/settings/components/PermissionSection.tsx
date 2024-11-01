"use client";

import Dropdown from '@/app/(app)/components/form/Dropdown'
import { useAppSelector } from '@/lib/hooks';
import React from 'react'

const roleOptions = [
  {
    id: "member-role-id",
    value: "MEMBER",
    displayName: "Anyone"
  },
  {
    id: "maintainer-role-id",
    value: "MAINTAINER",
    displayName: "Maintainer"
  },
  {
    id: "leader-role-id",
    value: "LEADER",
    displayName: "Leader"
  },
]

const PermissionSection = () => {
  const { categoryRoles, removeMemberRoles, updateFamilyRoles, familyExpenseRoles, inviteAcceptRequestRoles } = useAppSelector(state => state.familySlice.settings);

  const handleRoleChange = (option: any) => {
    console.log(option);
  }
  return (
    <section>
      <h2>Permissions</h2>
      <div>
        <b><label>Invite Access</label></b>
        <Dropdown
          className={"bg-dark-bg w-full flex justify-between max-w-[200px] ml-2 p-2"}
          options={roleOptions}
          selectedOption={"MAINTAINER"}
          onChange={handleRoleChange}
          ulClass={"bg-dark-bg"}
          listHoverBg={"hover:border-b hover:border-light-text"}
        />
      </div>
    </section>
  )
}

export default PermissionSection
