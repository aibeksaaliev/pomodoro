import {configureStore} from "@reduxjs/toolkit";
import {PomodoroReducer} from "../store/PomodoroSlice";

export const store = configureStore({
  reducer: {
    pomodoro: PomodoroReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;