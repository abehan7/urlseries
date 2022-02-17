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
    ADD_FOLDER: (state, action) => {
      state.folders = [action.payload, ...state.folders];
    },
    REMOVE_FOLDER: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder._id !== action.payload
      );
    },

    // 이거 하나로 끝내기? ok
    SET_FOLDER_CONTENTS: (state, action) => {
      const { folderId, urls } = action.payload;
      const folder = state.find((folder) => folder._id === folderId);
      folder.folderContents = urls;
    },
    // setContent 테스트 후 지우기
    // 굳이 여기서 실시간으로 넣고 빼고 할 필요는 없을 듯
    // 아래도 같은 이유
    // 위에 AddFolder쪽도 여기랑 동일하게 만들기
    ADD_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = [...urlId, ...folder.folderContents];
    },
    // setContent 테스트 후 지우기
    REMOVE_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = folder.folderContents.filter(
        (url) => url !== urlId
      );
    },
  },
});

export const { SET_FOLDER_CONTENTS, ADD_FOLDER, REMOVE_FOLDER } =
  folderSlice.actions;

export default folderSlice.reducer;
