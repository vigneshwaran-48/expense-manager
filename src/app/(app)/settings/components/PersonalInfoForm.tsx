"use client"

import React, { ChangeEvent } from 'react'
import TextInput from '../../components/form/TextInput'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setPersonalInfo } from '@/lib/features/settings/settingsSlice'

const PersonalInfoForm = () => {

  const personalInfo = useAppSelector(state => state.settingsSlice.personalInfo);
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: any) => {
    dispatch(setPersonalInfo({ ...personalInfo, [name]: value }))
  };

  return (
    <div className="w-full max-w-[600px]">
      <div className="w-full flex">
        <TextInput
          name="firstName"
          id="first-name-id"
          value={personalInfo.firstName}
          onChange={(text) => handleChange("firstName", text)}
          displayName="First Name"
          placeholder="Smith"
          inputClassName="bg-light-bg"
          className="my-6"
        />
        <TextInput
          name="lastName"
          id="last-name-id"
          value={personalInfo.lastName}
          onChange={(text) => handleChange("lastName", text)}
          displayName="Last Name"
          placeholder="S"
          inputClassName="bg-light-bg"
          className="my-6"
        />
      </div>
      <TextInput
        name="name"
        id="name-id"
        value={personalInfo.name}
        onChange={(text) => handleChange("name", text)}
        displayName="Name"
        placeholder="Smith"
        inputClassName="bg-light-bg"
        className="my-6 w-full"
      />
    </div>
  )
}

export default PersonalInfoForm
