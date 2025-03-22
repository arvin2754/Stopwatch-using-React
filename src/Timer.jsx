import React, { useRef, useState, useEffect } from "react";
import kaithi from "./assets/kaithi.mp3";

export default function Timer() {
  const [timerItems, setTimerItems] = useState({ min: 0, sec: 10 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const runner = () => {
    if (intervalRef.current) return; 

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimerItems((prev) => {
        let { min, sec } = prev;

        if (min === 0 && sec === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          audioRef.current.play(); 
          setIsRunning(false);
          return prev;
        }

        if (sec === 0) {
          min -= 1;
          sec = 59;
        } else {
          sec -= 1;
        }

        return { min, sec };
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTimerItems({ min: 0, sec: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimerItems((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div>

        {isRunning?(
            <h1>
            {String(timerItems.min).padStart(2, "0")}:
            {String(timerItems.sec).padStart(2, "0")}
          </h1>

        ):(<>
            <input
        type="number"
        name="min"
        value={timerItems.min}
        onChange={handleChange}
        disabled={isRunning}
      />
      <input
        type="number"
        name="sec"
        value={timerItems.sec}
        onChange={handleChange}
        disabled={isRunning}
      />
      </>
        )}


      <div>
        <button onClick={runner} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <audio ref={audioRef} src={kaithi} />
    </div>
  );
}
