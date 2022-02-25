import { createSlice } from "@reduxjs/toolkit";

const tags = {
  metaTagItems: [],
  folderTagItems: [],
  isClicked: false,
  isMetaTag: null,
};
const TagSlice = createSlice({
  name: "tags",
  initialState: tags,
  reducers: {
    SET_META_TAGS: (state, action) => {
      state.metaTagItems.push(action.payload);
      state.isMetaTag = true;
    },
    SET_FOLDER_TAGS: (state, action) => {
      state.folderTagItems.push(action.payload);
      state.isMetaTag = false;
    },
    SET_CLICKED: (state, action) => {
      state.isClicked = action.payload;
    },
    REMOVE_FOLDER_TAGS: (state, action) => {
      state.folderTagItems = state.folderTagItems.filter(
        (item) => item !== action.payload
      );
    },
    REMOVE_META_TAGS: (state, action) => {
      state.metaTagItems = state.metaTagItems.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export default TagSlice.reducer;
export const {
  SET_META_TAGS,
  SET_FOLDER_TAGS,
  SET_CLICKED,
  REMOVE_FOLDER_TAGS,
  REMOVE_META_TAGS,
} = TagSlice.actions;

// Selectors
export const getMetaTagItems = (state) => state.tags.metaTagItems;
export const getFolderTagItems = (state) => state.tags.folderTagItems;
export const getIsClicked = (state) => state.tags.isClicked;
export const getIsMetaTag = (state) => state.tags.isMetaTag;
