import { searchFamily } from "@/app/actions/family";
import { FamilySearch } from "@/util/AppTypes";
import React from "react";
import FamilyBar from "./FamilyBar";

const FamilyResults = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const results = await searchFamily(query, page);
  const families: FamilySearch[] = results.results;

  console.log(results);

  const familyElems = families.map((family) => (
    <FamilyBar key={family.id} family={family} />
  ));

  return (
    <div className="max-w-[700px] w-full h-[calc(100%-150px)]">
      {familyElems}
    </div>
  );
};

export default FamilyResults;
