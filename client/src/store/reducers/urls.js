import { createSlice } from "@reduxjs/toolkit";

const items = {
  tagFilterdItems: [],
  tagTotalItems: [],
  clickUrlInfo: {
    url: "",
    title: "",
    hashTags: "",
    memo: "",
    isLiked: false,
  },
};

const urlSlice = createSlice({
  name: "urls",
  initialState: items,
  reducers: {
    ADD_TAG_FILTERD_ITEMS: (state, action) => {
      const uniqueItems = [
        ...new Set(state.tagFilterdItems.concat(action.payload)),
      ];
      state.tagFilterdItems = uniqueItems;
    },
    REMOVE_TAG_FILTERD_ITEMS: (state, action) => {
      state.tagFilterdItems = state.tagFilterdItems.filter(
        (item) => item !== action.payload
      );
    },
    GET_CLEAR_TAG_FILTERD_ITEMS: (state, action) => {
      state.tagFilterdItems = [];
    },
    SET_TAG_TOTAL_ITEMS: (state, action) => {
      state.tagTotalItems = action.payload;
    },
    SET_CLICKED_URL_INFO: (state, action) => {
      state.clickUrlInfo = action.payload;
    },
  },
});

export default urlSlice.reducer;

export const {
  ADD_TAG_FILTERD_ITEMS,
  REMOVE_TAG_FILTERD_ITEMS,
  GET_CLEAR_TAG_FILTERD_ITEMS,
  SET_TAG_TOTAL_ITEMS,
  SET_CLICKED_URL_INFO,
} = urlSlice.actions;

// Selectors
export const getTagFilterdItems = (state) => state.urls.tagFilterdItems;
export const getTagTotalItems = (state) => state.urls.tagTotalItems;
export const getClickUrlInfo = (state) => state.urls.clickUrlInfo;
