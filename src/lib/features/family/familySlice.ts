import { Family, Role } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FamilySlice {
  family: Family;
  role: Role;
  loaded: boolean;
}

const initialState: FamilySlice = {
  family: {
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
  },
  role: "LEADER",
  loaded: false,
};

const familySlice = createSlice({
  name: "familySlice",
  initialState,
  reducers: {
    setFamily: (state, action: PayloadAction<FamilySlice>) => {
      state.family = action.payload.family;
      state.role = action.payload.role;
      state.loaded = action.payload.loaded;
    },
  },
});

export const { setFamily } = familySlice.actions;
export default familySlice.reducer;
