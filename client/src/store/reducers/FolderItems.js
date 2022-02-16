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
    SET_ITEMS: (state, action) => {
      state.items = action.payload;
    },
    ADD_ITEMS: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    REMOVE_ITEMS: (state, action) => {
      state.items = state.items.filter((item) => {
        return !action.payload.some((id) => id === item);
      });
    },
    SET_FILTERED_ITEMS: (state, action) => {
      state.filterdItems = action.payload;
    },
  },
});

export const { SET_ITEMS, ADD_ITEMS, SET_FILTERED_ITEMS, REMOVE_ITEMS } =
  folderItemsSlice.actions;

export default folderItemsSlice.reducer;
