"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import { setSideNav } from "@/lib/features/app/appSlice";
import HamburgerIcon from "@/app/components/HamburgerIcon";
import XIcon from "@/app/components/XIcon";
import LogoutIcon from "@/app/components/LogoutIcon";

const Sidebar = () => {
  const { name, image } = useAppSelector((state) => state.userSlice);
  const isSideNavOpen = useAppSelector((state) => state.appSlice.isSideNavOpen);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex flex-col items-center my-4 top-0 bottom-0 md:h-full w-[--sidebar-width] bg-light-bg md:rounded absolute left-0 transition-all duration-500 md:relative md:mr-4 p-2 ${
        isSideNavOpen ? "translate-x-0 ml-4" : "translate-x-[-100%]"
      } md:translate-x-0 border-r border-color-text md:border-none md:my-0`}
    >
      <HamburgerIcon
        className={`w-[26px] h-[26px] mx-2 cursor-pointer md:hidden absolute top-0 left-[100%] sm:ml-6 sm:mt-2 ${
          isSideNavOpen ? "hidden" : "block"
        }`}
        onClick={() => dispatch(setSideNav(true))}
      />
      <XIcon
        className={`w-[26px] h-[26px] mx-2 cursor-pointer md:hidden absolute top-0 left-[100%] sm:ml-4 sm:mt-2 ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => dispatch(setSideNav(false))}
      />
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
      <Navbar />
      <button className="flex items-center justify-between w-full max-w-[100px] bg-red-600 text-white p-2 my-2 rounded">
        <LogoutIcon />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
