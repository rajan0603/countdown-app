import React, { useState, useEffect } from 'react';
import "./CountdownTimer.css"

function CountdownTimer() {
  const [countdownTime, setCountdownTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            setTimerRunning(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const handleEditTime = (event) => {
    const newTime = parseInt(event.target.value, 10);
    setCountdownTime(newTime);
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='wrapper'>
      <div>
        <h1>Countdown Timer</h1>
        <div>
          <label>
            Set Timer (in seconds):
            <input type="number" value={countdownTime} onChange={handleEditTime} />
          </label>
        </div>
        <div>
          <button onClick={startTimer} disabled={timerRunning}>Start</button>
          <button onClick={stopTimer}>Stop</button>
        </div>
        <div>
          <h2>Time Remaining: {formatTime(currentTime)}</h2>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
