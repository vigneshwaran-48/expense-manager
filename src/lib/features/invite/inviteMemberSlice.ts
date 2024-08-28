import { User } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showMembersContainer: false,
  users: [] as User[],
};

const invitesMemberSlice = createSlice({
  name: "invitesMemberSlice",
  initialState,
  reducers: {
    setShowMembersInviteContainer: (state, action: PayloadAction<boolean>) => {
      state.showMembersContainer = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { setShowMembersInviteContainer, setUsers, removeUser, addUser } =
  invitesMemberSlice.actions;
export default invitesMemberSlice.reducer;
