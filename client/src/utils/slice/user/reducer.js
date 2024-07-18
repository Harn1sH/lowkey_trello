import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, THUNK_API) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/login/validate`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    return await response.json();
  },
);
