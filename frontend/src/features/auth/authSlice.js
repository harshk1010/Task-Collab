import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await api.post("/auth/login", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
