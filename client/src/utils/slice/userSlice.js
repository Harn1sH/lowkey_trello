import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    _id: null,
  },
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
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
