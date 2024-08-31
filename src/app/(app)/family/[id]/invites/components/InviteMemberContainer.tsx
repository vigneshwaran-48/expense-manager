"use client";

import { getAllUsers } from "@/app/actions/user";
import XIcon from "@/app/components/icon/XIcon";
import {
  setShowMembersInviteContainer,
  setUsers,
} from "@/lib/features/invite/inviteMemberSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InviteMember from "./button/InviteMember";

const InviteMemberContainer = ({ familyId }: { familyId: string }) => {
  const { showMembersContainer, users } = useAppSelector(
    (state) => state.inviteMemberSlice
  );
  const [userQuery, setUserQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchUsers(userQuery);
  }, []);

  const fetchUsers = async (query: string) => {
    setLoading(true);
    const users = await getAllUsers(false, query);
    dispatch(setUsers(users));
    setLoading(false);
  };

  const handleUserQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(e.target.value);
    fetchUsers(e.target.value);
  };

  const userElems = users
    .filter(
      (user) =>
        userQuery.trim() === "" ||
        user.name.toLowerCase().includes(userQuery.toLowerCase()) ||
        user.email.includes(userQuery) ||
        user.id === userQuery
    )
    .map((user) => {
      return (
        <div
          className="flex items-center p-2 mb-2 hover:bg-light-bg rounded justify-between"
          key={user.id}
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
          <div className="flex flex-col flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-[12px] text-light-color-text md:hidden">
              {user.email.length > 25 ? user.email.slice(0, 20) + ".." : user.email}
            </p>
            <p className="text-[14px] text-light-color-text hidden md:block">
              {user.email}
            </p>
          </div>
          <InviteMember familyId={familyId} memberId={user.id} />
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
        </div>
        <div className="p-2 flex flex-col">
          <p className="py-2 text-light-color-text">Members</p>
          <div className="h-[300px] flex flex-col overflow-y-scroll hide-scrollbar">
            {!loading ? userElems : <MembersSkeleton />}
          </div>
        </div>
      </div>
    </div>
  );
};

const MembersSkeleton = () => {
  return (
    <>
      <div className="flex items-center p-2 mb-2 hover:bg-light-bg rounded cursor-pointer group">
        <div className="w-[40px] h-[40px] rounded-full bg-light-bg group-hover:bg-dark-bg"></div>
        <div className="flex flex-col w-full justify-center ml-2">
          <p className="font-medium px-4 my-2 py-1 w-[40%] bg-light-bg group-hover:bg-dark-bg"></p>
          <p className="text-[14px] px-4 py-1 text-light-color-text w-[35%] bg-light-bg group-hover:bg-dark-bg"></p>
        </div>
      </div>
      <div className="flex items-center p-2 mb-2 hover:bg-light-bg rounded cursor-pointer group">
        <div className="w-[40px] h-[40px] rounded-full bg-light-bg group-hover:bg-dark-bg"></div>
        <div className="flex flex-col w-full justify-center ml-2">
          <p className="font-medium px-4 my-2 py-1 w-[40%] bg-light-bg group-hover:bg-dark-bg"></p>
          <p className="text-[14px] px-4 py-1 text-light-color-text w-[35%] bg-light-bg group-hover:bg-dark-bg"></p>
        </div>
      </div>
      <div className="flex items-center p-2 mb-2 hover:bg-light-bg rounded cursor-pointer group">
        <div className="w-[40px] h-[40px] rounded-full bg-light-bg group-hover:bg-dark-bg"></div>
        <div className="flex flex-col w-full justify-center ml-2">
          <p className="font-medium px-4 my-2 py-1 w-[40%] bg-light-bg group-hover:bg-dark-bg"></p>
          <p className="text-[14px] px-4 py-1 text-light-color-text w-[35%] bg-light-bg group-hover:bg-dark-bg"></p>
        </div>
      </div>
      <div className="flex items-center p-2 mb-2 hover:bg-light-bg rounded cursor-pointer group">
        <div className="w-[40px] h-[40px] rounded-full bg-light-bg group-hover:bg-dark-bg"></div>
        <div className="flex flex-col w-full justify-center ml-2">
          <p className="font-medium px-4 my-2 py-1 w-[40%] bg-light-bg group-hover:bg-dark-bg"></p>
          <p className="text-[14px] px-4 py-1 text-light-color-text w-[35%] bg-light-bg group-hover:bg-dark-bg"></p>
        </div>
      </div>
    </>
  );
};

export default InviteMemberContainer;
