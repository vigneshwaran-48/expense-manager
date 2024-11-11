"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react'
import PermissionRoleDropdown from './PermissionRoleDropdown';
import { setFamilySettings } from '@/lib/features/family/familySlice';



const PermissionSection = () => {
  const settings = useAppSelector(state => state.familySlice.settings);
  const familyId = useAppSelector(state => state.familySlice.family.id);
  const dispatch = useAppDispatch();

  return (
    <section className="w-full max-w-[500px] p-2">
      <h2 className="text-2xl font-bold">Permissions</h2>
      <PermissionRoleDropdown
        displayName={"Invite Access"}
        roles={settings.inviteAcceptRequestRoles}
        settingRole={"INVITE_ACCEPT_ROLE"}
        familyId={familyId || "null"}
        onChange={roles => dispatch(setFamilySettings({ ...settings, inviteAcceptRequestRoles: roles }))}
      />
      <PermissionRoleDropdown
        displayName={"Category Access"}
        roles={settings.categoryRoles}
        settingRole={"CATEGORY_ROLE"}
        familyId={familyId || "null"}
        onChange={roles => dispatch(setFamilySettings({ ...settings, categoryRoles: roles }))}
      />
      <PermissionRoleDropdown
        displayName={"Remove Member Access"}
        roles={settings.removeMemberRoles}
        settingRole={"REMOVE_MEMBER_ROLE"}
        familyId={familyId || "null"}
        onChange={roles => dispatch(setFamilySettings({ ...settings, removeMemberRoles: roles }))}
      />
      <PermissionRoleDropdown
        displayName={"Update Family Access"}
        roles={settings.updateFamilyRoles}
        settingRole={"UPDATE_FAMILY_ROLE"}
        familyId={familyId || "null"}
        onChange={roles => dispatch(setFamilySettings({ ...settings, updateFamilyRoles: roles }))}
      />
      <PermissionRoleDropdown
        displayName={"Family Expense Access"}
        roles={settings.familyExpenseRoles}
        settingRole={"FAMILY_EXPENSE_ROLE"}
        familyId={familyId || "null"}
        onChange={roles => dispatch(setFamilySettings({ ...settings, familyExpenseRoles: roles }))}
      />
    </section>
  )
}

export default PermissionSection
