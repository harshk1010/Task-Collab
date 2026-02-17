import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import boardReducer from "../features/boards/boardSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    tasks: taskReducer
  }
});
