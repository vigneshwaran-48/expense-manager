"use client";

import { Category, Settings, User } from "@/util/AppTypes";
import React, { useEffect } from "react";
import { getProfile } from "../actions/user";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { getFamilySettings, getMemberOfFamily, getUserFamily } from "../actions/family";
import { setFamily } from "@/lib/features/family/familySlice";
import { getAllCategories } from "../actions/category";
import { setCategories } from "@/lib/features/category/categorySlice";
import { setPersonalInfo, setPreferences } from "@/lib/features/settings/settingsSlice";
import { getSettings } from "../actions/settings";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const fetchAndSetUser = async () => {
    const [user, familyResponse, categories, settings]: [User, any, Category[], Settings] = await Promise.all([
      getProfile(),
      getUserFamily(),
      getAllCategories(),
      getSettings()
    ]);
    user.showLoginPopup = false;
    user.isLoggedIn = true;

    dispatch(setPreferences(settings))
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
