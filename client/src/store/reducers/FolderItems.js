import { createSlice } from "@reduxjs/toolkit";

const folderItems = {
  originalItems: [],
  items: [],
  filterdItems: [],
};

export const folderItemsSlice = createSlice({
  name: "folderItems",
  initialState: folderItems,
  reducers: {
    setOriginalItems: (state, action) => {
      state.originalItems = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setFilterdItems: (state, action) => {
      state.filterdItems = action.payload;
    },
  },
});

export const actions = folderItemsSlice.actions;

export default folderItemsSlice.reducer;
