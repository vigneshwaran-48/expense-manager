import { NavLink } from "@/app/components/NavLink";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const JoinFamily = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="p-2 text-2xl font-bold">You are not in a family.</h2>
      <Image
        src="/images/join-family.png"
        width={400}
        height={400}
        alt="Join a family illustration"
        className="sm:w-[400px] sm:h-[400px] w-[250px] h-[250px] my-2"
      />
      <NavLink href="/family/search">
        <button className="m-2 button bg-other-bg text-other-text">
          Join a Family
        </button>
      </NavLink>
    </div>
  );
};

export default JoinFamily;
