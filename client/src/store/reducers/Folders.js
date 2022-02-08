import { createSlice } from "@reduxjs/toolkit";

const folders = [
  {
    folderName: "123",
    folderContents: ["urlId1", "urlId2", "urlId3"],
  },
];

export const folderSlice = createSlice({
  name: "folders",
  initialState: { folders },
  reducers: {
    AddFolder: (state, action) => {
      state.push(action.payload);
    },
    DeleteFolder: (state, action) => {
      state = state.filter((folder) => folder.folderName !== action.payload);
    },
    AddContents: (state, action) => {
      const { folderName, urlId } = action.payload;
      const folder = state.find((folder) => folder.folderName === folderName);
      folder.folderContents.push(urlId);
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

export const { AddFolder, DeleteFolder, AddContents, DeleteContents } =
  folderSlice.actions;

export default folderSlice.reducer;
