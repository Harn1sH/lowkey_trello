import { createSlice } from "@reduxjs/toolkit";
import { addTaskAsync } from "./reducer";
import { errorHandler } from "../../errorHandler";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    isViewModalOpen: false,
    isAddModalOpen: false,
    task: null,
    tasks: [],
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
  extraReducers: (builder) => {
    builder.addCase(addTaskAsync.rejected, (state, action) => {
      errorHandler(action.payload);
    });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.tasks = [
        ...state.tasks,
        {
          task: action.payload.task,
          description: action.payload.description,
          progress: action.payload.progress,
          createdAt: action.payload.createdAt,
        },
      ];
      state.isAddModalOpen = false;
    });
  },
});

export default taskSlice.reducer;
export const { viewTask, closeTask, addTask } = taskSlice.actions;
