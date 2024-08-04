"use client";

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
            className={`rounded transition-all duration-500 my-1 w-full p-2 inline-block hover:bg-dark-bg`}
            href="/"
            useStartsWith={false}
          >
            Dashboard
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 inline-block hover:bg-dark-bg`}
            href="/expenses"
          >
            Expenses
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 inline-block hover:bg-dark-bg`}
            href="/family"
          >
            Family
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 inline-block hover:bg-dark-bg`}
            href="/categories"
          >
            Categories
          </NavLink>
        </li>
        <li onClick={() => dispatch(setSideNav(false))}>
          <NavLink
            activeClassName={`bg-other-bg text-other-text hover:bg-other-bg`}
            className={`rounded transition-all duration-500 my-1 w-full p-2 inline-block hover:bg-dark-bg`}
            href="/settings"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
