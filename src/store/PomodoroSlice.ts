import {createSlice} from "@reduxjs/toolkit";
import {TimerType} from "../types";
import {RootState} from "../app/store";

interface PomodoroState {
  mode: string;
  modePower: number;
  time: TimerType;
  timerStatus: boolean;
}

const initialState: PomodoroState = {
  mode: "pomodoro",
  modePower: 1500,
  time: {
    minutes: "25",
    seconds: "00",
  },
  timerStatus: false,
};

export const PomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    runTimer: (state) => {
      state.modePower--;

      state.time.seconds = (parseFloat(state.time.seconds) - 1).toString();

      if (state.time.seconds === "-1") {
        state.time.minutes = (parseFloat(state.time.minutes) - 1).toString();
        state.time.seconds = "59";
      }

      state.time.seconds = (parseFloat(state.time.seconds) < 10 ? "0" + state.time.seconds : state.time.seconds);
      state.time.minutes = (parseFloat(state.time.minutes) < 10 ? "0" + state.time.minutes : state.time.minutes);
    },
    setTimer: (state) => {
      state.timerStatus = !state.timerStatus;
    },
    setPomodoroMode: (state) => {
      state.timerStatus = false;
      state.mode = "pomodoro";
      state.modePower = 1500;
      state.time.minutes = "25";
      state.time.seconds = "00";
    },
    setShortBreakMode: (state) => {
      state.timerStatus = false;
      state.mode = "short break";
      state.modePower = 300;
      state.time.minutes = "05";
      state.time.seconds = "00";
    },
    setLongBreakMode: (state) => {
      state.timerStatus = false;
      state.mode = "long break";
      state.modePower = 900;
      state.time.minutes = "15";
      state.time.seconds = "00";
    },
  }
});

export const PomodoroReducer = PomodoroSlice.reducer;
export const {runTimer, setTimer, setPomodoroMode, setShortBreakMode, setLongBreakMode} = PomodoroSlice.actions;
export const selectTime = (state: RootState) => state.pomodoro.time;
export const selectTimerStatus = (state: RootState) => state.pomodoro.timerStatus;
export const selectMode = (state: RootState) => state.pomodoro.mode;