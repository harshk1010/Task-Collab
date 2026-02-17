import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchBoards = createAsyncThunk("boards/fetch", async () => {
  const response = await api.get("/boards");
  return response.data;
});

export const createBoard = createAsyncThunk("boards/create", async (title) => {
  const response = await api.post("/boards", { title });
  return response.data;
});

const boardSlice = createSlice({
  name: "boards",
  initialState: { boards: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });
  }
});

export const deleteBoard = createAsyncThunk(
  "boards/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/boards/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);




export default boardSlice.reducer;
