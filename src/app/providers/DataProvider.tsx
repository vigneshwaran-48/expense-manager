"use client";

import { Category, User } from "@/util/AppTypes";
import React, { useEffect } from "react";
import { getProfile } from "../actions/user";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { getMemberOfFamily, getUserFamily } from "../actions/family";
import { setFamily } from "@/lib/features/family/familySlice";
import { getAllCategories } from "../actions/category";
import { setCategories } from "@/lib/features/category/categorySlice";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const fetchAndSetUser = async () => {
    const [user, familyResponse, categories]: [User, any, Category[]] = await Promise.all([
      getProfile(),
      getUserFamily(),
      getAllCategories()
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
    dispatch(setCategories(categories));
  };

  return <>{children}</>;
};

export default UserProvider;
