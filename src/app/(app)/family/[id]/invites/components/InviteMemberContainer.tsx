"use client";

import XIcon from "@/app/components/icon/XIcon";
import Image from "next/image";
import React, { useState } from "react";

const InviteMemberContainer = ({ show }: { show: boolean }) => {
  const [userQuery, setUserQuery] = useState<string>();

  const handleUserQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
  };

  return (
    <div
      className={`z-40 fixed top-0 left-0 right-0 bottom-0 p-4  ${
        show ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="absolute w-full h-full bg-light-bg opacity-70"></div>
      <div className="w-full max-w-[500px] rounded bg-dark-bg flex flex-col p-2 z-50">
        <div className="flex justify-between border-b items-center">
          <h2 className="text-xl font-bold py-2">Add Member</h2>
          <XIcon className="cursor-pointer" />
        </div>
        <div className="flex justify-between items-end p-2">
          <label className="flex flex-col w-3/4">
            <p className="py-2 text-light-color-text">Id/Name/Email</p>
            <input
              name="userQuery"
              value={userQuery}
              onChange={handleUserQueryChange}
              placeholder="Alice"
              className="w-full outline-none border-none rounded p-2 bg-light-bg text-color-text"
            />
          </label>
          <button className="button w-1/4 ml-4 h-fit bg-other-bg text-other-text">
            Invite
          </button>
        </div>
        <div className="p-2 flex flex-col">
          <p className="py-2 text-light-color-text">Members</p>
          <div className="h-[250px]"></div>
        </div>
        <div className="p-2 flex flex-col">
          <p className="py-2 text-light-color-text">Selected</p>
          <div className="flex overflow-x-scroll hide-scrollbar">
            <div className="w-[40px] h-[40px] rounded-full relative cursor-pointer group mx-1 flex-shrink-0">
              <Image
                src={"/images/person.jpg"}
                width={40}
                height={40}
                alt="User image"
                className="rounded-full absolute"
              />
              <span className="absolute w-full h-full rounded-full flex items-center justify-center bg-light-bg opacity-0 group-hover:opacity-70 transition duration-500">
                <XIcon className="text-white text-[20px] font-bold" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberContainer;
