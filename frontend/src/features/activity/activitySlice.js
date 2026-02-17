import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const fetchActivity = createAsyncThunk(
  "activity/fetch",
  async ({ boardId, page = 1 }) => {
    const response = await api.get(
      `/boards/${boardId}/activity?page=${page}`
    );
    return response.data;
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
    page: 1,
    loading: false
  },
  reducers: {
    addActivityRealTime: (state, action) => {
      state.activities.unshift(action.payload);
    },
    clearActivity: (state) => {
      state.activities = [];
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivity.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { addActivityRealTime, clearActivity } =
  activitySlice.actions;

export default activitySlice.reducer;
