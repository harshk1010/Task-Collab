import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async ({ search = "", page = 1 }) => {
    const response = await api.get(`/tasks?search=${search}&page=${page}`);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  reducers: {
    updateTaskRealTime: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  }
});

export const { updateTaskRealTime } = taskSlice.actions;
export default taskSlice.reducer;
