import { createSlice } from "@reduxjs/toolkit";

const FolderConditions = {
  isFolderContents: false,
};

const folderConditionsSlice = createSlice({
  name: "folderConditions",
  initialState: FolderConditions,
  reducers: {
    SET_IS_FOLDER_CONTENTS: (state, action) => {
      state.isFolderContents = action.payload;
    },
  },
});

export const { SET_IS_FOLDER_CONTENTS } = folderConditionsSlice.actions;
export default folderConditionsSlice.reducer;
