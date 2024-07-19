import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./reducer";
import { errorHandler } from "../../errorHandler";

const initialState = {
  name: null,
  email: null,
  _id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.firstName;
      state.email = action.payload.email;
      state._id = action.payload._id;
    },
    removeUser: (state, action) => {
      state.name = null;
      state.email = null;
      state._id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { email, _id, firstName: name } = action.payload;
        return { name, _id, email };
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      errorHandler(action.payload);
    });
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
