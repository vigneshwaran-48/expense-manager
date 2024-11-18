import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PersonalForm {
  name: string,
  firstName: string,
  lastName: string,
  image: string,
  age: number
}

interface Preferences {
  isDark: boolean,
  theme: string
}

interface State {
  personalInfo: PersonalForm,
  preferences: Preferences
}

const initialState: State = {
  personalInfo: {
    name: "User",
    firstName: "User",
    lastName: "U",
    image: "/images/person.jpg",
    age: 18
  },
  preferences: {
    isDark: true,
    theme: "blue"
  }
}

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalForm>) => {
      state.personalInfo = action.payload;
    },
    setPreferences: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    }
  }
});

export const { setPersonalInfo, setPreferences } = settingsSlice.actions;
export default settingsSlice.reducer;
