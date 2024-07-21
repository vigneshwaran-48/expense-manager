"use client";

import { User } from "@/util/AppTypes";
import React, { useEffect } from "react";
import { getProfile } from "../actions/user";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const fetchAndSetUser = async () => {
    const user: User = await getProfile();
    user.showLoginPopup = false;
    user.isLoggedIn = true;
    dispatch(setUser(user));
  };

  return <>{ children }</>;
};

export default UserProvider;
