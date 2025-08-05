import { useCallback, useEffect, useRef, useState } from "react";

const Digitalclock = () => {
  const [_, setCount] = useState(0);
  const [time, setTime] = useState(new Date());
  const [timeAni, setTimeAni] = useState(new Date());

  const timeRef = useRef(null);

  // This will lose milliseconds due to inital milliseconds neglection and then the code execution time factor.
  useEffect(() => {
    setInterval(() => {
      setCount((p) => p + 1);
    }, 1000);
  }, []);

  // Correct Approach
  useEffect(() => {
    const tick = () => {
      setTime(new Date());
      const now = new Date();
      const delay = 1000 - (now % 1000);
      setTimeout(tick, delay);
    };

    const timeOutId = setTimeout(tick, 1000 - (new Date() % 1000));

    return () => clearTimeout(timeOutId);
  }, []);

  const updateClock = useCallback(() => {
    setTimeAni(new Date());
    timeRef.current = requestAnimationFrame(updateClock);
  }, []);

  useEffect(() => {
    timeRef.current = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(timeRef.current);
  }, [updateClock]);

  const formatTime = (date) => {
    let hr = date.getHours();
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds();

    let isAm = true;

    if (hr >= 12) isAm = false;

    hr = hr % 12 || 12;

    return `${hr}:${min}:${sec} ${isAm ? "AM" : "PM"}`;
  };

  return (
    <div className="bg-gray-900 h-screen w-full flex flex-col items-center gap-10">
      <h1
        className="my-30 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md
      hover:bg-pink-700 transition text-3xl"
      >
        Digital Clock
      </h1>
      <div className="ml-15 w-auto text-white text-7xl min-w-110">
        <span className="text-lg">
          Custom Formatter: Simple &nbsp;&nbsp;&nbsp;-{" "}
        </span>
        {formatTime(new Date())}
        <br />
        <span className="text-lg">Custom Formatter: Complex - </span>
        {formatTime(time)}
        <br />
        <span className="text-lg">Custom Formatter: Animation - </span>
        {formatTime(timeAni)}
      </div>
      <div className="text-4xl font-normal text-rose-600">
        <span className="text-lg">
          toLocaleTimeString: Simple &nbsp;&nbsp;&nbsp;-{" "}
        </span>
        {new Date().toLocaleTimeString()}
        <br />
        <span className="text-lg">toLocaleTimeString: Complex - </span>
        {time.toLocaleTimeString()}
        <br />
        <span className="text-lg">toLocaleTimeString: Animation - </span>
        {timeAni.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Digitalclock;
