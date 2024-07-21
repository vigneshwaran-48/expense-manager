"use client";

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const { name, image } = useAppSelector((state) => state.userSlice);

  return (
    <div className="h-full w-[--sidebar-width] bg-light-bg rounded hidden md:flex md:mr-4 p-2">
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={`${name}'s picture`}
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full my-2"
        />
        <b>
          <p className="text-center">Hello, {name}</p>
        </b>
      </div>
      
    </div>
  );
};

export default Sidebar;
