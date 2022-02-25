import { createSlice } from "@reduxjs/toolkit";

// 아직 사용 안하고있으니 삭제 가능
const items = [];

const TagFilterdSlice = createSlice({
  name: "tagFilterdItems",
  initialState: items,
  reducers: {
    SET_TAG_FILTERD_ITEMS: (state, action) => {
      state = action.payload;
    },
  },
});

export default TagFilterdSlice.reducer;
export const { SET_TAG_FILTERD_ITEMS } = TagFilterdSlice.actions;

// Selectors
export const getTagFilterdItems = (state) => state.tagFilterdItems;
