"use client";

import { NavLink } from "@/app/components/NavLink";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const navLinkClassName =
  "p-2 m-2 transition flex-shrink-0 duration-500 rounded md:hover:bg-dark-bg md:hover:text-dark-text";
const activeNavLinkClassName = "text-other-text bg-other-bg";

const Navbar = ({ id }: { id: string }) => {
  const userRole = useAppSelector((state) => state.familySlice.role);

  return (
    <nav className="w-full">
      <ul className="w-full flex border-b text-light-color-text border-light-color-text overflow-x-scroll hide-scrollbar">
        <NavLink
          href={`/family/${id}`}
          className={navLinkClassName}
          activeClassName={activeNavLinkClassName}
          useStartsWith={false}
        >
          <li>Dashboard</li>
        </NavLink>
        <NavLink
          href={`/family/${id}/members`}
          className={navLinkClassName}
          activeClassName={activeNavLinkClassName}
          useStartsWith={false}
        >
          <li>Members</li>
        </NavLink>
        <NavLink
          href={`/family/${id}/expenses`}
          className={navLinkClassName}
          activeClassName={activeNavLinkClassName}
          useStartsWith={false}
        >
          <li>Expenses</li>
        </NavLink>
        {userRole === "LEADER" && (
          <NavLink
            href={`/family/${id}/invites`}
            className={navLinkClassName}
            activeClassName={activeNavLinkClassName}
            useStartsWith={false}
          >
            <li>Invites</li>
          </NavLink>
        )}
        <NavLink
          href={`/family/${id}/categories`}
          className={navLinkClassName}
          activeClassName={activeNavLinkClassName}
          useStartsWith={false}
        >
          <li>Categories</li>
        </NavLink>
        {userRole === "LEADER" && (
          <NavLink
            href={`/family/${id}/settings`}
            className={navLinkClassName}
            activeClassName={activeNavLinkClassName}
            useStartsWith={false}
          >
            <li>Settings</li>
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
