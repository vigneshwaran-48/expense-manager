"use client";

import { User } from "@/util/AppTypes";
import React, { useEffect } from "react";
import { getProfile } from "../actions/user";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { getMemberOfFamily, getUserFamily } from "../actions/family";
import { setFamily } from "@/lib/features/family/familySlice";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const fetchAndSetUser = async () => {
    const [user, familyResponse]: [User, any] = await Promise.all([
      getProfile(),
      getUserFamily(),
    ]);
    user.showLoginPopup = false;
    user.isLoggedIn = true;
    dispatch(setUser(user));

    if (familyResponse.status === 200) {
      const familyMember = await getMemberOfFamily(
        familyResponse.family.id,
        user.id
      );
      dispatch(
        setFamily({
          family: familyMember.family,
          role: familyMember.role,
          loaded: true,
        })
      );
    }
  };

  return <>{children}</>;
};

export default UserProvider;
