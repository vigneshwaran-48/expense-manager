"use client";

import Searchbar from "@/app/(app)/components/Searchbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const FamilySearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleQuery = (query: string) => {
    const queryParams = new URLSearchParams(searchParams);
    if (query) {
      queryParams.set("query", query);
      queryParams.set("page", "1");
    } else {
      queryParams.delete("query");
      queryParams.delete("page");
    }
    replace(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <Searchbar
      id="family-search-id"
      name="familyQuery"
      onChange={handleQuery}
      placeholder="Search Family"
      defaultValue={searchParams.get("query") || ""}
    />
  );
};

export default FamilySearchBar;
