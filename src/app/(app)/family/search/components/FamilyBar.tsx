import { Family, FamilySearch } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";
import JoinButton from "./JoinButton";

const FamilyBar = ({ family }: { family: FamilySearch }) => {
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
      <JoinButton id={family.id as string} isRequestExists={family.joinRequestExists} />
    </div>
  );
};

export default FamilyBar;
