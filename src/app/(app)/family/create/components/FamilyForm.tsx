"use client";

import ImageInput from "@/app/(app)/components/form/ImageInput";
import { RadioButtonModel } from "@/app/(app)/components/form/RadioButton";
import RadioGroup from "@/app/(app)/components/form/RadioGroup";
import TextAreaInput from "@/app/(app)/components/form/TextAreaInput";
import TextInput from "@/app/(app)/components/form/TextInput";
import { createFamily } from "@/app/actions/family";
import { addToast, ToastType } from "@/lib/features/toast/toastSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Family } from "@/util/AppTypes";
import { getUniqueId } from "@/util/getUniqueId";
import { redirect } from "next/navigation";
import React, { useState } from "react";

interface ErrorField {
  field: string;
  message: string;
}

const FamilyForm = () => {
  const dispatch = useAppDispatch();

  const [family, setFamily] = useState<Family>({
    name: "",
    image: "",
    visibility: "PUBLIC",
    joinType: "ANYONE",
  });

  const [errors, setErrors] = useState<ErrorField[]>([]);

  const visibilityOptions: RadioButtonModel[] = [
    {
      name: "visibility",
      displayName: "Public",
      value: "PUBLIC",
      checked: family.visibility === "PUBLIC",
      onChange: (e) => handleChange("visibility", e.target.value),
    },
    {
      name: "visibility",
      displayName: "Private",
      value: "PRIVATE",
      checked: family.visibility === "PRIVATE",
      onChange: (e) => handleChange("visibility", e.target.value),
    },
  ];

  const joinTypeOptions: RadioButtonModel[] = [
    {
      name: "joinType",
      displayName: "Anyone",
      value: "ANYONE",
      checked: family.joinType === "ANYONE",
      onChange: (e) => handleChange("joinType", e.target.value),
    },
    {
      name: "joinType",
      displayName: "Invite Only",
      value: "INVITE_ONLY",
      checked: family.joinType === "INVITE_ONLY",
      onChange: (e) => handleChange("joinType", e.target.value),
    },
  ];

  const handleChange = (name: string, value: any) => {
    if (
      (name === "name" && value && value.length > 20) ||
      (name === "description" && value && value.length > 100)
    ) {
      return;
    }
    setFamily((prevFamily) => ({ ...prevFamily, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await createFamily(family);
    console.log(response);
    if (response.status === 200) {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.SUCCESS,
          message: response.message,
        })
      );
    } else {
      dispatch(
        addToast({
          id: getUniqueId(),
          type: ToastType.ERROR,
          message: response.error,
        })
      );
      return;
    }
    redirect("/family");
  };

  const getError = (field: string) => {
    return errors.find((error) => error.field === field);
  };

  return (
    <div className="md:pl-8 max-w-[400px] w-full h-full overflow-y-scroll hide-scrollbar">
      <ImageInput
        id="family-image-id"
        name="image"
        value="/images/family-profile.png"
        displayName="Family Image"
        onChange={(e) => {}}
        className="my-6"
      />
      <TextInput
        name="name"
        id="family-name-id"
        value={family?.name || ""}
        onChange={(text) => handleChange("name", text)}
        displayName="Family Name"
        placeholder="The Smiths"
        inputClassName="bg-light-bg"
        className="my-6"
        error={getError("name") ? true : false}
        errorMessage={getError("name") ? getError("name")?.message : ""}
      />
      <TextAreaInput
        name="description"
        id="family-description-id"
        value={family?.description || ""}
        onChange={(text) => handleChange("description", text)}
        displayName="Family Descrption"
        placeholder="The Smiths"
        inputClassName="bg-light-bg"
        className="my-6"
        error={getError("description") ? true : false}
        errorMessage={
          getError("description") ? getError("description")?.message : ""
        }
      />
      <RadioGroup
        displayName="Visibility"
        radios={visibilityOptions}
        className="my-6"
      />
      <RadioGroup
        displayName="Join Type"
        radios={joinTypeOptions}
        className="my-6"
      />
      <div className="w-full text-right">
        <button
          className="button bg-other-bg text-other-text"
          type="button"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default FamilyForm;
