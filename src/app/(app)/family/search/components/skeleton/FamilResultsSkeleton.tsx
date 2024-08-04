import React from "react";
import FamilbarSkeleton from "./FamilbarSkeleton";

const FamilResultsSkeleton = () => {
  return (
    <div className="max-w-[700px] w-full h-[calc(100%-150px)]">
      <FamilbarSkeleton />
      <FamilbarSkeleton />
      <FamilbarSkeleton />
      <FamilbarSkeleton />
      <FamilbarSkeleton />
      <FamilbarSkeleton />
    </div>
  );
};

export default FamilResultsSkeleton;
