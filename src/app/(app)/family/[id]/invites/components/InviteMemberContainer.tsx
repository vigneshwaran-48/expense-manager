"use client";

import { getAllUsers } from "@/app/actions/user";
import XIcon from "@/app/components/icon/XIcon";
import {
  addSelectedUser,
  removeSelectedUser,
  setShowMembersInviteContainer,
  setUsers,
} from "@/lib/features/invite/inviteMemberSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InviteMemberContainer = () => {
  const { showMembersContainer, users, selectedUsers } = useAppSelector(
    (state) => state.inviteMemberSlice
  );
  const [userQuery, setUserQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const users = await getAllUsers();
      dispatch(setUsers(users));
    })();
  }, []);

  const handleUserQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
  };

  const userElems = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(userQuery.toLowerCase()) ||
        user.email.includes(userQuery) ||
        user.id === userQuery
    )
    .map((user) => {
      return (
        <div
          className="flex items-center p-2 mb-2 hover:bg-light-bg rounded cursor-pointer"
          key={user.id}
          onClick={() => dispatch(addSelectedUser(user))}
        >
          <Image
            src={
              user.image && user.image.startsWith("http")
                ? user.image
                : "/images/person.jpg"
            }
            alt={`${user.name}'s image`}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <div className="flex flex-col">
            <p className="font-medium">{user.name}</p>
            <p className="text-[14px] text-light-color-text">{user.email}</p>
          </div>
        </div>
      );
    });

  const selectedUserElems = selectedUsers.map((user) => {
    return (
      <div
        className="w-[40px] h-[40px] rounded-full relative cursor-pointer group mx-1 flex-shrink-0"
        key={user.id}
        onClick={() => dispatch(removeSelectedUser(user))}
      >
        <Image
          src={
            user.image && user.image.startsWith("http")
              ? user.image
              : "/images/person.jpg"
          }
          width={40}
          height={40}
          alt="User image"
          className="rounded-full absolute"
        />
        <span className="absolute w-full h-full rounded-full flex items-center justify-center bg-light-bg opacity-0 group-hover:opacity-70 transition duration-500">
          <XIcon className="text-white text-[20px] font-bold" />
        </span>
      </div>
    );
  });

  return (
    <div
      className={`z-40 fixed top-0 left-0 right-0 bottom-0 p-4  ${
        showMembersContainer ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="absolute w-full h-full bg-light-bg opacity-70"></div>
      <div className="w-full max-w-[500px] rounded bg-dark-bg flex flex-col p-2 z-50">
        <div className="flex justify-between border-b items-center">
          <h2 className="text-xl font-bold py-2">Add Member</h2>
          <XIcon
            className="cursor-pointer"
            onClick={() => dispatch(setShowMembersInviteContainer(false))}
          />
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
          <button
            className={`p-2 rounded w-1/4 ml-4 h-fit ${
              selectedUsers.length > 0
                ? "bg-other-bg text-other-text"
                : "bg-light-bg text-light-color-text"
            }`}
          >
            Invite
          </button>
        </div>
        <div className="p-2 flex flex-col">
          <p className="py-2 text-light-color-text">Members</p>
          <div className="h-[250px] flex flex-col overflow-y-scroll hide-scrollbar">
            {userElems}
          </div>
        </div>
        <div className="p-2 flex flex-col">
          <p className="py-2 text-light-color-text">Selected</p>
          <div className="flex overflow-x-scroll hide-scrollbar h-[40px]">
            {selectedUserElems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberContainer;
