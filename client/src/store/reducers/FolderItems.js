import { createSlice } from "@reduxjs/toolkit";

const folderItems = {
  // 바꾸기전 아이템들
  originalItems: [],
  // 바꾼 후 아이템들
  items: [],
  // 검색 후 아이템들
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
