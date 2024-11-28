"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import Navbar from "./Navbar";
import { setSideNav } from "@/lib/features/app/appSlice";
import HamburgerIcon from "@/app/components/icon/HamburgerIcon";
import XIcon from "@/app/components/icon/XIcon";
import LogoutIcon from "@/app/components/icon/LogoutIcon";
import SecureImage from "@/app/components/SecureImage";
import { logout } from "@/app/actions/user";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { name, image } = useAppSelector((state) => state.userSlice);
  const isSideNavOpen = useAppSelector((state) => state.appSlice.isSideNavOpen);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const response = await logout()
    console.log(response)
    signOut()
  }

  return (
    <div
      className={`flex flex-col items-center text-light-color-text my-4 top-0 bottom-0 md:h-full w-[--sidebar-width] bg-light-bg md:rounded absolute left-0 transition-all duration-500 md:relative md:mr-4 p-2 ${isSideNavOpen ? "translate-x-0 ml-4" : "translate-x-[-100%]"
        } md:translate-x-0 border-r border-color-text md:border-none md:my-0 z-30`}
    >
      <HamburgerIcon
        className={`w-[26px] h-[26px] mx-2 cursor-pointer md:hidden absolute top-0 left-[100%] sm:ml-6 sm:mt-2 ${isSideNavOpen ? "hidden" : "block"
          }`}
        onClick={() => dispatch(setSideNav(true))}
      />
      <XIcon
        className={`w-[26px] h-[26px] mx-2 cursor-pointer md:hidden absolute top-0 left-[100%] sm:ml-4 sm:mt-2 ${isSideNavOpen ? "block" : "hidden"
          }`}
        onClick={() => dispatch(setSideNav(false))}
      />
      <div className="flex flex-col items-center">
        <SecureImage
          url={image || "/images/person.jpg"}
          alt={`${name}'s picture`}
          className="w-[100px] h-[100px] rounded-full my-2"
        />
        <b>
          <p className="text-center text-color-text">Hello, {name}</p>
        </b>
      </div>
      <Navbar />
      <button onClick={handleLogout} className="flex items-center justify-between w-full max-w-[100px] bg-red-600 text-white p-2 my-2 rounded">
        <LogoutIcon />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
