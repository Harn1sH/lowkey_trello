import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  fetchTaskAsync,
} from "./reducer";
import { errorHandler } from "../../errorHandler";

const defaultTask = {
  _id: null,
  task: null,
  description: null,
  createdAt: null,
};
const initialState = {
  isViewModalOpen: false,
  isAddModalOpen: false,
  isEditModalOpen: false,
  task: defaultTask,
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    viewTask: (state, action) => {
      state.isViewModalOpen = true;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.task = {
        task: action.payload.task,
        description: action.payload.description,
        createdAt: action.payload.createdAt,
      };
    },
    editTask: (state, action) => {
      state.isViewModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = true;
      state.task = {
        _id: action.payload._id,
        task: action.payload.task,
        description: action.payload.description,
        createdAt: action.payload.createdAt,
        progress: action.payload.progress,
      };
    },
    closeTask: (state, action) => {
      state.isViewModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.task = defaultTask;
    },
    addTask: (state, action) => {
      state.isAddModalOpen = true;
    },
    logOutTask: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTaskAsync.rejected, (state, action) => {
      errorHandler(`4 ${action.payload}`);
    });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.tasks = [
        ...state.tasks,
        {
          task: action.payload.task,
          description: action.payload.description,
          progress: action.payload.progress,
          createdAt: action.payload.createdAt,
          _id: action.payload._id,
        },
      ];
      state.isAddModalOpen = false;
    });
    builder.addCase(fetchTaskAsync.rejected, (state, action) => {
      errorHandler(action.payload);
    });
    builder.addCase(fetchTaskAsync.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(editTaskAsync.fulfilled, (state, action) => {
      state.isEditModalOpen = false;
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      return state;
    });
    builder.addCase(deleteTaskAsync.rejected, (state, action) => {
      errorHandler(action.payload);
    });
  },
});

export default taskSlice.reducer;
export const { viewTask, closeTask, addTask, editTask, logOutTask } =
  taskSlice.actions;
