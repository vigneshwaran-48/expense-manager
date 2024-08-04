import React from "react";

const FamilbarSkeleton = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 mb-4 hover:bg-dark-bg rounded transition duration-500">
      <div className="rounded-full sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] bg-dark-bg hover:bg-light-bg"></div>
      <div className="flex flex-col flex-1 px-2">
        <h3 className="text-xl font-bold h-[15px] w-[20%] bg-dark-bg hover:bg-light-bg mb-2"></h3>
        <p className="h-[25px] w-[60%] bg-dark-bg hover:bg-light-bg"></p>
      </div>
    </div>
  );
};

export default FamilbarSkeleton;
