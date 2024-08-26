import { User } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showMembersContainer: false,
  users: [] as User[],
  selectedUsers: [] as User[],
};

const invitesMemberSlice = createSlice({
  name: "invitesMemberSlice",
  initialState,
  reducers: {
    setShowMembersInviteContainer: (state, action: PayloadAction<boolean>) => {
      state.showMembersContainer = action.payload;
    },
    addSelectedUser: (state, action: PayloadAction<User>) => {
      if (
        state.selectedUsers.findIndex((user) => user.id === action.payload.id) <
        0
      ) {
        state.selectedUsers = [...state.selectedUsers, action.payload];
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      }
    },
    removeSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
      if (state.users.findIndex((user) => user.id === action.payload.id) < 0) {
        state.users = [...state.users, action.payload];
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const {
  setShowMembersInviteContainer,
  addSelectedUser,
  removeSelectedUser,
  setUsers,
} = invitesMemberSlice.actions;
export default invitesMemberSlice.reducer;
