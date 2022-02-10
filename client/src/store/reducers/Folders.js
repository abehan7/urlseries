import { createSlice } from "@reduxjs/toolkit";

const folders = [
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8b",
    folderName: "crypto",
    folderContents: [],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8c",
    folderName: "punk",
    folderContents: [],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8d",
    folderName: "nft",
    folderContents: [],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8e",
    folderName: "bored Apes bored Apes bored Apes",
    folderContents: [],
  },
];

export const folderSlice = createSlice({
  name: "folders",
  initialState: { folders },
  reducers: {
    AddFolder: (state, action) => {
      state.folders = [action.payload, ...state.folders];
    },
    RemoveFolder: (state, action) => {
      state = state.filter((folder) => folder.folderName !== action.payload);
    },
    AddContent: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = [urlId, ...folder.folderContents];
    },
    RemoveContent: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = folder.folderContents.filter(
        (url) => url !== urlId
      );
    },
  },
});

export const actions = folderSlice.actions;

export default folderSlice.reducer;
