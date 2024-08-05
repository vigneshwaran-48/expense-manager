"use client";

import { RadioButtonModel } from "@/app/(app)/components/form/RadioButton";
import RadioGroup from "@/app/(app)/components/form/RadioGroup";
import TextAreaInput from "@/app/(app)/components/form/TextAreaInput";
import TextInput from "@/app/(app)/components/form/TextInput";
import { useAppSelector } from "@/lib/hooks";
import { Family } from "@/util/AppTypes";
import React, { useState } from "react";

const FamilyForm = () => {
  const user = useAppSelector((state) => state.userSlice);

  const [family, setFamily] = useState<Family>({
    name: "",
    createdBy: user,
    image: "",
    visibility: "PUBLIC",
    joinType: "ANYONE",
  });

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
    setFamily((prevFamily) => ({ ...prevFamily, [name]: value }));
  };

  return (
    <form>
      <TextInput
        name="name"
        id="family-name-id"
        value={family?.name || ""}
        onChange={(text) => handleChange("name", text)}
        displayName="Family Name"
        placeholder="The Smiths"
        inputClassName="bg-light-bg"
        className="my-6"
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
    </form>
  );
};

export default FamilyForm;
