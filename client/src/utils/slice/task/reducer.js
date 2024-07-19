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

export const fetchTaskAsync = createAsyncThunk(
  "task/fetchTaskAsync",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/task/get`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    return await response.json();
  },
);

export const editTaskAsync = createAsyncThunk(
  "task/editTaskAsync",
  async (payload) => {
    console.log("hits", payload);
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/task/edit`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: { "content-type": "application/json" },
      },
    );
    return await response.json();
  },
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (payload) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/task/delete`,
      {
        method: "DELETE",
        body: JSON.stringify(payload),
        credentials: "include",
        headers: { "content-type": "application/json" },
      },
    );
    return await response.json();
  },
);
