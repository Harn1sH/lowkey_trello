import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTaskAsync = createAsyncThunk(
  "view/addTaskAsync",
  async (payload) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/task/add`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
        headers: { "content-type": "application/json" },
      },
    );
    return await response.json();
  },
);
