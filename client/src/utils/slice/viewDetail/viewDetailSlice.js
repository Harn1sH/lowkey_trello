import { createSlice } from "@reduxjs/toolkit";

const viewDetailSlice = createSlice({
  name: "view",
  initialState: {
    isViewModalOpen: false,
    isAddModalOpen: false,
    task: null,
    description: null,
    createdAt: null,
  },
  reducers: {
    viewTask: (state, action) => {
      state.isViewModalOpen = true;
      state.isAddModalOpen = false;
      state.task = action.payload.task;
      state.description = action.payload.description;
      state.createdAt = action.payload.createdAt;
    },
    closeTask: (state, action) => {
      state.isViewModalOpen = false;
      state.isAddModalOpen = false;
      state.task = null;
      state.description = null;
      state.createdAt = null;
    },
    addTask: (state, action) => {
      state.isAddModalOpen = true;
    },
  },
});

export default viewDetailSlice.reducer;
export const { viewTask, closeTask, addTask } = viewDetailSlice.actions;
