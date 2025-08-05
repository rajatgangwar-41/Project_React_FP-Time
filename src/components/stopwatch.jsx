import React, { useCallback, useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  const stopwatchRef = useRef(null);
  const intervalRef = useRef(null);
  const needToResumeRef = useRef(true);

  const handleStart = useCallback(() => {
    clearInterval(intervalRef.current);
    needToResumeRef.current = true;

    stopwatchRef.current = new Date().getTime() - time;
    intervalRef.current = setInterval(() => {
      setTime(new Date().getTime() - stopwatchRef.current);
    }, 10);
  }, [time]);

  const handlePause = () => {
    clearInterval(intervalRef.current);
    needToResumeRef.current = false;
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const handleBlur = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  const handleFocus = useCallback(() => {
    if (needToResumeRef.current) handleStart();
  }, [handleStart]);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [time, handleBlur, handleFocus]);

  const formatTime = () => {
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const hr = Math.floor(time / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");

    return `${hr}:${min}:${sec}:${ms}`;
  };

  return (
    <div className="bg-gray-900 h-screen w-full flex flex-col items-center gap-10">
      <h1 className="mt-30 text-red-700 font-normal text-5xl">Stopwatch</h1>
      <div className="mt-40 ml-15 inline-block w-auto text-white text-7xl min-w-110">
        {formatTime()}
      </div>
      <ul className="flex gap-5">
        <li className="hover:bg-white hover:text-black border text-lg shadow-2xl rounded-lg text-white">
          <button className="cursor-pointer py-2 px-4 " onClick={handleStart}>
            Start
          </button>
        </li>
        <li className="hover:bg-white hover:text-black border text-lg shadow-2xl rounded-lg text-white">
          <button className="cursor-pointer  py-2 px-4 " onClick={handlePause}>
            Pause
          </button>
        </li>
        <li className="hover:bg-white hover:text-black border text-lg shadow-2xl rounded-lg text-white">
          <button className="cursor-pointer  py-2 px-4 " onClick={handleReset}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Stopwatch;
