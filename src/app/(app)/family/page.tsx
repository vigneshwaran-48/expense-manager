import { getUserFamily } from "@/app/actions/family";
import React from "react";
import NoFamily from "./components/NoFamily";
import Title from "../components/Title";
import { redirect } from "next/navigation";

export const generateMetadata = async () => {
  const response = await getUserFamily();
  const headers = {
    title: response.status !== 200 ? "Family" : response.family.name,
    description: "Expense Manager family page",
  };
  if (response.status === 200) {
    headers.description = `${response.family.name}'s page`;
  }
  return headers;
};

const page = async () => {
  const response = await getUserFamily();
  const hasFamily = response.status === 200;

  const title = hasFamily ? response.family.name : "Family";

  if (hasFamily) {
    redirect(`/family/${response.family.id}`);
  }

  return (
    <div className="w-full h-full">
      <Title title={title} />
      <NoFamily />
    </div>
  );
};

export default page;
