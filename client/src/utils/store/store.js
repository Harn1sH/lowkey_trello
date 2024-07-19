import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/user/userSlice";
import taskSlice from "../slice/task/taskSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },
});

export default store;
