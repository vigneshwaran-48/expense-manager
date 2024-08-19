import { Family, Role } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FamilySlice {
  family: Family;
  role: Role;
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
};

const familySlice = createSlice({
  name: "familySlice",
  initialState,
  reducers: {
    setFamily: (state, action: PayloadAction<FamilySlice>) => {
      state.family = action.payload.family;
      state.role = action.payload.role;
    },
  },
});

export const { setFamily } = familySlice.actions;
export default familySlice.reducer;
