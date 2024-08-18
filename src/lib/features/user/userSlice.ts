import { User } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: User = {
    id: "user-001",
    name: "User",
    firstName: "User",
    lastName: "U",
    email: "user@gmail.com",
    image: "",
    age: 18,
    showLoginPopup: false
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            // Setting all values separately then only it is getting reflected in the store.
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.showLoginPopup = action.payload.showLoginPopup;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setLoginPopup: (state, action: PayloadAction<boolean>) => {
            state.showLoginPopup = action.payload;
        }
    },
});

export const { setUser, setLoginPopup } = userSlice.actions;
export default userSlice.reducer;
