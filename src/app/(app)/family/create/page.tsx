import { getUserFamily } from "@/app/actions/family";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import Title from "../../components/Title";
import FamilyForm from "./components/FamilyForm";

export const metadata: Metadata = {
  title: "Create Family",
  description: "Create a family",
};

const page = async () => {
  const response = await getUserFamily();

  if (response.status === 200) {
    redirect(`/family/${response.family.id}`);
  }

  return (
    <div>
        <Title title="Create Family" />
        <FamilyForm />
    </div>
  );
};

export default page;
