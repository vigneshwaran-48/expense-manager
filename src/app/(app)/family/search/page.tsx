import { Metadata } from "next";
import React from "react";
import Title from "../../components/Title";
import FamilySearchBar from "./components/FamilySearchBar";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Family",
};

const page = ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) => {

    const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full h-full">
        <Title title="Search" />
        <FamilySearchBar />
    </div>
  );
};

export default page;
