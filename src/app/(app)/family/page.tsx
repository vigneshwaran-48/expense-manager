import { getUserFamily } from "@/app/actions/family";
import React from "react";
import Dashboard from "./components/Dashboard";
import NoFamily from "./components/NoFamily";
import Title from "../components/Title";

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

  console.log(`Title => ${title}`);

  return (
    <div className="w-full h-full">
      <Title title={title} />
      {hasFamily ? <Dashboard family={response.family} /> : <NoFamily />}
    </div>
  );
};

export default page;
