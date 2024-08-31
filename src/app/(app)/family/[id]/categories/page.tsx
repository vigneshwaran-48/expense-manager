import Category from "@/app/(app)/categories/components/Category";
import React from "react";

const page = async () => {

  return (
    <div className="p-2 w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 extra-lg:grid-cols-4 justify-items-center overflow-y-scroll hide-scrollbar">
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  );
};

export default page;
