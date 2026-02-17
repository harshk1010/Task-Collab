import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const createList = createAsyncThunk(
  "lists/create",
  async ({ title, boardId }) => {
    const response = await api.post("/lists", {
      title,
      boardId
    });
    return response.data;
  }
);


export const updateList = createAsyncThunk(
  "lists/update",
  async ({ id, title }) => {
    const response = await api.patch(`/lists/${id}`, {
      title
    });
    return response.data;
  }
);


export const deleteList = createAsyncThunk(
  "lists/delete",
  async (id) => {
    await api.delete(`/lists/${id}`);
    return id;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: false
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(
          (list) => list.id === action.payload.id
        );
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.id !== action.payload
        );
      });
  }
});

export const { setLists } = listSlice.actions;
export default listSlice.reducer;
