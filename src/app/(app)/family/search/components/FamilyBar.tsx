import { Family } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";

const FamilyBar = ({ family }: { family: Family }) => {
  return (
    <div className="w-full flex justify-between items-center p-4 mb-4 hover:bg-dark-bg rounded transition duration-500">
      <Image
        src={"/images/family-profile.png"}
        alt="Family profile"
        width={60}
        height={60}
        className="rounded-full sm:w-[60px] sm:h-[60px] w-[40px] h-[40px]"
      />
      <div className="flex flex-col flex-1 px-2">
        <h3 className="text-xl font-bold">{family.name}</h3>
        <p>{family.description}</p>
      </div>
      <button className="button bg-other-bg text-other-text text-[16px] h-fit">Join</button>
    </div>
  );
};

export default FamilyBar;
