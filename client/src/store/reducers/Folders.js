import { createSlice } from "@reduxjs/toolkit";

const ADD = "ADD";
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
    ADD: (state, action) => {
      switch (action.type) {
        case ADD:
          return {
            ...state,
          };
        default:
          return state;
      }
    },
  },
});

export default folderSlice.reducer;
