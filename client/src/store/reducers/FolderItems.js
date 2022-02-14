import { createSlice } from "@reduxjs/toolkit";

const folderItems = {
  // 바꾼 후 아이템들
  items: [],
  // 검색 후 아이템들
  filterdItems: [],
};

export const folderItemsSlice = createSlice({
  name: "folderItems",
  initialState: folderItems,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItems: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    setFilterdItems: (state, action) => {
      state.filterdItems = action.payload;
    },
  },
});

export const { setItems, addItems, setFilterdItems } = folderItemsSlice.actions;

export default folderItemsSlice.reducer;
