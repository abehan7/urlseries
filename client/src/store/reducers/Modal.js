import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { isModalOpen: false },
  reducers: {
    OPEN_MODAL: (state, action) => {
      state.isModalOpen = true;
    },
    CLOSE_MODAL: (state, action) => {
      state.isModalOpen = false;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
