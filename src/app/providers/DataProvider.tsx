"use client";

import { Category, User } from "@/util/AppTypes";
import React, { useEffect } from "react";
import { getProfile } from "../actions/user";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { getFamilySettings, getMemberOfFamily, getUserFamily } from "../actions/family";
import { setFamily } from "@/lib/features/family/familySlice";
import { getAllCategories } from "../actions/category";
import { setCategories } from "@/lib/features/category/categorySlice";
import { setPersonalInfo } from "@/lib/features/settings/settingsSlice";

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
    dispatch(setPersonalInfo({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      name: user.name || "",
      age: user.age || 18,
      image: user.image || "/images/person.jpg"
    }))

    if (familyResponse.status === 200) {
      const [familyMember, familySettings] = await Promise.all([
        getMemberOfFamily(familyResponse.family.id, user.id),
        getFamilySettings(familyResponse.family.id)]
      );
      dispatch(
        setFamily({
          family: familyMember.family,
          role: familyMember.role,
          loaded: true,
          settings: familySettings
        })
      );
    }
    dispatch(setCategories(categories));
  };

  return <>{children}</>;
};

export default UserProvider;
