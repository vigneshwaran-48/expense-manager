import { Metadata } from "next";
import React, { Suspense } from "react";
import Title from "../../components/Title";
import FamilySearchBar from "./components/FamilySearchBar";
import FamilyResults from "./components/FamilyResults";
import FamilResultsSkeleton from "./components/skeleton/FamilResultsSkeleton";

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
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full h-full flex flex-col justify-around items-center">
      <Title title="Search" />
      <FamilySearchBar />
      <Suspense key={query + page} fallback={<FamilResultsSkeleton />}>
        <FamilyResults query={query} page={currentPage} />
      </Suspense>
    </div>
  );
};

export default page;
