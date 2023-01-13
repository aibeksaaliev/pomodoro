import React, {useEffect} from 'react';
import {Button} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  runTimer,
  selectMode,
  selectTime,
  selectTimerStatus, setLongBreakMode,
  setPomodoroMode, setShortBreakMode,
  setTimer
} from "../../store/PomodoroSlice";


const Timer = () => {
  const dispatch  = useAppDispatch();
  const time = useAppSelector(selectTime);
  const status = useAppSelector(selectTimerStatus);
  const mode = useAppSelector(selectMode);


  useEffect(() => {
    if (status) {
      const timerInterVal = setInterval(() => {
        dispatch(runTimer());
      }, 1000);
      return () => clearInterval(timerInterVal);
    }
  }, [dispatch, status]);

  return (
    <div className="w-50 text-bg-dark m-auto mt-5 p-5 text-center rounded rounded-4">
      <div className="d-flex justify-content-around w-75 m-auto mb-3">
        <Button
          variant="secondary"
          active={mode === "pomodoro"}
          onClick={() => dispatch(setPomodoroMode())}
        >
          Pomodoro
        </Button>
        <Button
          variant="secondary"
          active={mode === "short break"}
          onClick={() => dispatch(setShortBreakMode())}
        >
          Short Break
        </Button>
        <Button
          variant="secondary"
          active={mode === "long break"}
          onClick={() => dispatch(setLongBreakMode())}
        >
          Long Break
        </Button>
      </div>
      <p className="fs-1"><b>{time.minutes}</b>:<b>{time.seconds}</b></p>
      <Button
        variant="light"
        size="lg"
        className="text-uppercase"
        onClick={() => dispatch(setTimer())}
      >
        {status ? "Pause" : "Start"}
      </Button>
    </div>
  );
};

export default Timer;