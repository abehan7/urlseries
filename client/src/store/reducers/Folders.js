import { createSlice } from "@reduxjs/toolkit";

const folders = [
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8b",
    folderName: "crypto",
    folderContents: ["urlId1", "urlId2", "urlId3"],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8c",
    folderName: "punk",
    folderContents: ["urlId1", "urlId2", "urlId3"],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8d",
    folderName: "nft",
    folderContents: ["urlId1", "urlId2", "urlId3"],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8e",
    folderName: "bored Apes",
    folderContents: ["urlId1", "urlId2", "urlId3"],
  },
];

export const folderSlice = createSlice({
  name: "folders",
  initialState: { folders },
  reducers: {
    AddFolder: (state, action) => {
      state.folders = [action.payload, ...state.folders];
    },
    DeleteFolder: (state, action) => {
      state = state.filter((folder) => folder.folderName !== action.payload);
    },
    AddContents: (state, action) => {
      const { folderName, urlId } = action.payload;

      const folders = state.folders.map((folder) => {
        return folder.folderName === folderName
          ? { ...folder, folderContents: [urlId, ...folder.folderContents] }
          : folder;
      });

      state.folders = folders;
    },
    DeleteContents: (state, action) => {
      const { folderName, urlId } = action.payload;
      const folder = state.find((folder) => folder.folderName === folderName);
      folder.folderContents = folder.folderContents.filter(
        (url) => url !== urlId
      );
    },
  },
});

export const actions = folderSlice.actions;

export default folderSlice.reducer;
