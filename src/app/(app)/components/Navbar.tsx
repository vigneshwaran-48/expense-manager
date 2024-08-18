"use client";

import BillIcon from "@/app/components/icon/BillIcon";
import DashboardIcon from "@/app/components/icon/DashboardIcon";
import GearIcon from "@/app/components/icon/GearIcon";
import PeopleIcon from "@/app/components/icon/PeopleIcon";
import TagsIcon from "@/app/components/icon/TagsIcon";
import { NavLink } from "@/app/components/NavLink";
import { setSideNav } from "@/lib/features/app/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className="w-full flex-1">
      <ul className="p-2 w-full flex flex-col mt-7">
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 hover:bg-dark-bg flex items-center`}
            href="/"
            useStartsWith={false}
          >
            <DashboardIcon />
            <p className="ml-2">Dashboard</p>
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 flex items-center hover:bg-dark-bg`}
            href="/expenses"
          >
            <BillIcon />
            <p className="ml-2">Expenses</p>
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 flex items-center hover:bg-dark-bg`}
            href="/family"
          >
            <PeopleIcon />
            <p className="ml-2">Family</p>
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 flex items-center hover:bg-dark-bg`}
            href="/categories"
          >
            <TagsIcon />
            <p className="ml-2">Categories</p>
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 flex items-center hover:bg-dark-bg`}
            href="/settings"
          >
            <GearIcon />
            <p className="ml-2">Settings</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
