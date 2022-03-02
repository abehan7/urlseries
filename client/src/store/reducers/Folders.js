import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddFolder, getFolderItems } from "../../components/Api";

const folders = [];

export const ADD_FOLDER = createAsyncThunk(
  "folders/ADD_FOLDER", // 액션 이름을 정의해 주도록 합니다.
  async (folder_name) => {
    const response = await AddFolder(folder_name);
    return response.data;
  }
);

export const SET_FOLDERS = createAsyncThunk(
  "folders/SET_FOLDERS", // 액션 이름을 정의해 주도록 합니다.
  async () => {
    const response = await getFolderItems();
    return response.data;
  }
);

export const folderSlice = createSlice({
  name: "folders",
  initialState: { folders },
  reducers: {
    REMOVE_FOLDER: (state, action) => {
      const FolderList = action.payload;
      state.folders = state.folders.filter(
        (folder) => !FolderList.includes(folder._id)
      );
    },

    SET_FOLDER_CONTENTS: (state, action) => {
      const { folderId, urls } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folder_contents = urls;
    },

    ADD_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folder_contents = [...urlId, ...folder.folder_contents];
    },
    REMOVE_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folder_contents = folder.folder_contents.filter(
        (url) => url !== urlId
      );
    },
    GET_CHANGE_FOLDER_NAME: (state, action) => {
      const { folderId, folder_name } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folder_name = folder_name;
    },

    SET_LIKE: (state, action) => {
      const { likedFolderIdList } = action.payload;
      state.folders.forEach((folder) => {
        likedFolderIdList.includes(folder._id) && (folder.like = true);
        !likedFolderIdList.includes(folder._id) && (folder.like = false);
      });
    },
  },

  extraReducers: {
    [ADD_FOLDER.fulfilled]: (state, action) => {
      // console.log(action.payload);
      const newFolder = action.payload;
      state.folders = [newFolder, ...state.folders];
    },
    [SET_FOLDERS.fulfilled]: (state, action) => {
      const newFolder = action.payload;
      state.folders = newFolder;
    },
  },
});

export const {
  SET_FOLDER_CONTENTS,
  GET_CHANGE_FOLDER_NAME,
  SET_LIKE,
  REMOVE_FOLDER,
} = folderSlice.actions;

// Selectors
export const getFolders = (state) => state.folders.folders;

export default folderSlice.reducer;
