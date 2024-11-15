"use client"

import React, { useState } from 'react'
import TextInput from '../../components/form/TextInput'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setPersonalInfo } from '@/lib/features/settings/settingsSlice'
import ImageInput from '../../components/form/ImageInput'
import { addToast, ToastType } from '@/lib/features/toast/toastSlice'
import { getUniqueId } from '@/util/getUniqueId'
import { uploadImage } from '@/app/actions/static'
import { getStaticResourceRoutes } from '@/util/ResourceServer'
import NumberInput from '../../components/form/NumberInput'
import { updateUser } from '@/app/actions/user'
import { User } from '@/util/AppTypes'

const PersonalInfoForm = () => {

  const userId = useAppSelector(state => state.userSlice.id);
  const personalInfo = useAppSelector(state => state.settingsSlice.personalInfo);
  const dispatch = useAppDispatch();
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const form = new FormData();
    form.append("resource", e.target.files[0]);
    setUploadingImage(true);
    const resourceResponse = await uploadImage(form);

    if (resourceResponse.status !== 200 && resourceResponse.status !== 201) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: resourceResponse.error,
        })
      );
      return;
    }
    const image = getStaticResourceRoutes().getOne(resourceResponse.resourceId);
    handleChange("image", image);
    setUploadingImage(false);
  };

  const handleChange = (name: string, value: any) => {
    dispatch(setPersonalInfo({ ...personalInfo, [name]: value }))
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const response = await updateUser(userId, personalInfo as User);
    if (response.status === 200) {
      dispatch(addToast({
        id: getUniqueId(),
        message: response.message,
        type: ToastType.SUCCESS
      }));
    } else {
      dispatch(addToast({
        id: getUniqueId(),
        message: response.error,
        type: ToastType.ERROR
      }))
    }
    setSubmitting(false);
  }

  return (
    <div className="w-full max-w-[700px] flex flex-col p-2 my-2">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <ImageInput
        id={"image-id"}
        name="image"
        value={personalInfo.image || "/images/person.jpg"}
        displayName="Profile Picture"
        onChange={handleImageChange}
        loading={uploadingImage}
        className="my-6"
      />
      <div className="w-full flex justify-between">
        <TextInput
          name="firstName"
          id="first-name-id"
          value={personalInfo.firstName}
          onChange={(text) => handleChange("firstName", text)}
          displayName="First Name"
          placeholder="Smith"
          inputClassName="bg-light-bg"
          className=""
        />
        <TextInput
          name="lastName"
          id="last-name-id"
          value={personalInfo.lastName}
          onChange={(text) => handleChange("lastName", text)}
          displayName="Last Name"
          placeholder="S"
          inputClassName="bg-light-bg"
          className=""
        />
      </div>
      <NumberInput
        name="name"
        id="name-id"
        value={personalInfo.age}
        onChange={(age) => handleChange("age", age)}
        displayName="Age"
        placeholder="18"
        inputClassName="bg-light-bg"
        className="m-2 w-full"
      />
      <TextInput
        name="name"
        id="name-id"
        value={personalInfo.name}
        onChange={(text) => handleChange("name", text)}
        displayName="Name"
        placeholder="Smith"
        inputClassName="bg-light-bg"
        className="m-2 w-full"
      />
      <div className="p-2 flex justify-end">
        <button
          className="px-4 py-1 bg-other-bg text-[20px] text-other-text rounded"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Editing" : "Edit"}
        </button>
      </div>
    </div>
  )
}

export default PersonalInfoForm
