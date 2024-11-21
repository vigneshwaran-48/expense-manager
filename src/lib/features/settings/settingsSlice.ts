import { Settings } from "@/util/AppTypes"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PersonalForm {
  name: string,
  firstName: string,
  lastName: string,
  image: string,
  age: number
}

interface State {
  personalInfo: PersonalForm,
  preferences: Settings
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
    darkMode: false,
    theme: "BLUE"
  }
}

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalForm>) => {
      state.personalInfo = action.payload;
    },
    setPreferences: (state, action: PayloadAction<Settings>) => {
      state.preferences = action.payload;
    }
  }
});

export const { setPersonalInfo, setPreferences } = settingsSlice.actions;
export default settingsSlice.reducer;
