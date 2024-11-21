"use client"

import React from 'react'
import ToggleInput from '../../components/form/ToggleInput'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setPreferences } from '@/lib/features/settings/settingsSlice'
import { updateSettings } from '@/app/actions/settings'
import { addToast, ToastType } from '@/lib/features/toast/toastSlice'
import { getUniqueId } from '@/util/getUniqueId'

const Preferences = () => {

  const preferences = useAppSelector(state => state.settingsSlice.preferences);
  const dispatch = useAppDispatch();

  const handleChange = async (name: string, value: any) => {
    dispatch(setPreferences({ ...preferences, [name]: value }));
    const response = await updateSettings({ ...preferences, [name]: value });
    if (response.status == 200) {
      dispatch(addToast({ id: getUniqueId(), message: response.message, type: ToastType.SUCCESS }))
    } else {
      dispatch(addToast({ id: getUniqueId(), message: response.error, type: ToastType.ERROR }))
    }

  };

  return (
    <div className="w-full max-w-[700px] flex flex-col p-2 my-2">
      <h2 className="text-xl font-semibold">Preferences</h2>
      <div className="w-full flex justify-between max-w-[250px] p-2 my-2">
        <p>Dark Theme</p>
        <ToggleInput name="darkMode" checked={preferences.darkMode} onChange={checked => handleChange("darkMode", checked)} id="is-dark-id" />
      </div>
    </div>
  )
}

export default Preferences
