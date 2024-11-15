import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PersonalForm {
  name: string,
  firstName: string,
  lastName: string,
  image: string,
  age: number
}

interface State {
  personalInfo: PersonalForm
}

const initialState: State = {
  personalInfo: {
    name: "User",
    firstName: "User",
    lastName: "U",
    image: "/images/person.jpg",
    age: 18
  }
}

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalForm>) => {
      state.personalInfo = action.payload;
    }
  }
});

export const { setPersonalInfo } = settingsSlice.actions;
export default settingsSlice.reducer;
