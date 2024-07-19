import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/user/userSlice";
import viewSlice from "../slice/viewDetail/viewDetailSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    view: viewSlice,
  },
});

export default store;
