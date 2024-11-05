"use client";

import Dropdown from '@/app/(app)/components/form/Dropdown'
import { useAppSelector } from '@/lib/hooks';
import { Role } from '@/util/AppTypes';
import React from 'react'
import PermissionRoleDropdown from './PermissionRoleDropdown';



const PermissionSection = () => {
  const { categoryRoles, removeMemberRoles, updateFamilyRoles, familyExpenseRoles, inviteAcceptRequestRoles } = useAppSelector(state => state.familySlice.settings);

  return (
    <section className="w-full max-w-[500px] p-2">
      <h2 className="text-2xl font-bold">Permissions</h2>
      <PermissionRoleDropdown displayName={"Invite Access"} inviteAcceptRequestRoles={inviteAcceptRequestRoles} />
    </section>
  )
}

export default PermissionSection
