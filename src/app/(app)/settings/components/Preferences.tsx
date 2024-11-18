"use client"

import React from 'react'
import ToggleInput from '../../components/form/ToggleInput'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setPreferences } from '@/lib/features/settings/settingsSlice'

const Preferences = () => {

  const preferences = useAppSelector(state => state.settingsSlice.preferences);
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: any) => {
    dispatch(setPreferences({ ...preferences, [name]: value }))
  };

  return (
    <div className="w-full max-w-[700px] flex flex-col p-2 my-2">
      <h2 className="text-xl font-semibold">Preferences</h2>
      <div className="w-full flex justify-between">
        <p>Dark Theme</p>
        <ToggleInput name="isDark" checked={preferences.isDark} onChange={checked => handleChange("isDark", checked)} id="is-dark-id" />
      </div>
    </div>
  )
}

export default Preferences
