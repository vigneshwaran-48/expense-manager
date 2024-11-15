import { Family, FamilySettings, Role } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FamilySlice {
  family: Family;
  role: Role;
  loaded: boolean;
  settings: FamilySettings;
}

const family: Family = {
  id: "testing",
  image: "/images/family-profile.png",
  joinType: "ANYONE",
  name: "Smiths",
  visibility: "PUBLIC",
  createdBy: {
    id: "user-id",
    age: 19,
    email: "user@gmail.com",
    name: "user",
  },
  createdTime: "",
  description: "",
}

const initialState: FamilySlice = {
  family,
  role: "MEMBER",
  loaded: false,
  settings: {
    id: "unknown",
    family,
    inviteAcceptRequestRoles: ["LEADER"],
    categoryRoles: ["LEADER"],
    removeMemberRoles: ["LEADER"],
    updateFamilyRoles: ["LEADER"],
    familyExpenseRoles: ["LEADER"]
  }
};

const familySlice = createSlice({
  name: "familySlice",
  initialState,
  reducers: {
    setFamily: (state, action: PayloadAction<FamilySlice>) => {
      state.family = action.payload.family;
      state.role = action.payload.role;
      state.loaded = action.payload.loaded;
      state.settings = action.payload.settings;
    },
    setFamilySettings: (state, action: PayloadAction<FamilySettings>) => {
      state.settings = action.payload;
    },
    setFamilyDetails: (state, action: PayloadAction<Family>) => {
      state.family = action.payload;
    }
  },
});

export const { setFamily, setFamilySettings, setFamilyDetails } = familySlice.actions;
export default familySlice.reducer;
