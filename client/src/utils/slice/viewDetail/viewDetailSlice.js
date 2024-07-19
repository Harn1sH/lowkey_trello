import { createSlice } from "@reduxjs/toolkit";

const viewDetailSlice = createSlice({
  name: "view",
  initialState: {
    modalOpen: false,
    task: null,
    description: null,
    createdAt: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.modalOpen = true;
      state.task = action.payload.task;
      state.description = action.payload.description;
      state.createdAt = action.payload.createdAt;
    },
    deleteTask: (state, action) => {
      state.modalOpen = false;
      state.task = null;
      state.description = null;
      state.createdAt = null;
    },
  },
});

export default viewDetailSlice.reducer;
export const { addTask, deleteTask } = viewDetailSlice.actions;
