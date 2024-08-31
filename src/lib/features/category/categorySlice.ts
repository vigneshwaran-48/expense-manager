import { Category, CategoryType } from "@/util/AppTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  categories: Category[];
  searchQuery: string;
  filter: "ALL" | "PERSONAL" | "FAMILY";
  creationPage: {
    show: boolean;
    name: string;
    description: string;
    image: string;
    type: CategoryType;
    uploadingImage: boolean;
    creating: boolean;
  };
}

const initialState: State = {
  categories: [],
  searchQuery: "",
  filter: "ALL",
  creationPage: {
    show: false,
    name: "",
    description: "",
    image: "/images/person.jpg",
    type: "PERSONAL",
    uploadingImage: false,
    creating: false,
  },
};

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories.length = 0;
      state.categories.push(...action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    showCreatePage: (state) => {
      state.creationPage.show = true;
    },
    hideCreatePage: (state) => {
      state.creationPage.show = false;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.creationPage.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.creationPage.description = action.payload;
    },
    setUploadinImage: (state, action: PayloadAction<boolean>) => {
      state.creationPage.uploadingImage = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.creationPage.image = action.payload;
    },
    setType: (state, action: PayloadAction<CategoryType>) => {
      state.creationPage.type = action.payload;
    },
    resetCreationPage: (state) => {
      state.creationPage.description = "";
      state.creationPage.name = "";
      state.creationPage.image = "/images/person.jpg";
      state.creationPage.show = false;
      state.creationPage.type = "PERSONAL";
      state.creationPage.uploadingImage = false;
      state.creationPage.creating = false;
    },
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.creationPage.creating = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setCategories,
  removeCategory,
  addCategory,
  showCreatePage,
  hideCreatePage,
  setName,
  setDescription,
  setUploadinImage,
  setImage,
  setType,
  resetCreationPage,
  setCreating,
  setSearchQuery,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
