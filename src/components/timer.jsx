import { useRef, useState } from "react";

const timer = {
  hour: "hh",
  min: "mm",
  sec: "ss",
  msec: "ms",
};

const Config = {
  [timer.hour]: {
    value: "",
    placeholder: "HH",
    factor: 60 * 60 * 1000,
  },
  [timer.min]: {
    value: "",
    placeholder: "MM",
    factor: 60 * 1000,
  },
  [timer.sec]: {
    value: "10",
    placeholder: "SS",
    factor: 1000,
  },
  // [timer.msec]: {
  //   value:"",
  //   placeholder: "HH",
  //   factor: 60 * 60 * 1000
  // },
};

const timerOrder = [
  timer.hour,
  timer.min,
  timer.sec,
  //  timer.msec
];

const Stopwatch = () => {
  const [config, setConfig] = useState(structuredClone(Config));
  const [time, setTime] = useState(0);
  const [timeOver, setTimeOver] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const elapsedTimeRef = useRef(0);
  const intervalRef = useRef(null);

  const handleChange = ({ key }) => {
    return (event) => {
      const newConfig = structuredClone(config);
      let value = Number(event.target.value);
      switch (key) {
        case "hh":
          value = Math.max(0, value);
          break;
        case "mm":
          value = Math.max(0, Math.min(60, value));
          break;
        case "ss":
          value = Math.max(0, Math.min(60, value));
          break;
        default:
          break;
      }
      newConfig[key].value = value;
      setConfig(newConfig);
    };
  };

  const handleStart = () => {
    clearInterval(intervalRef.current);
    setTimeOver(false);

    let totalTime = 0;

    timerOrder.forEach((timeKey) => {
      if (!isNaN(config[timeKey].value))
        totalTime += config[timeKey].value * config[timeKey].factor;
    });

    startTimeRef.current = Date.now();
    timerRef.current =
      startTimeRef.current + totalTime - elapsedTimeRef.current;

    intervalRef.current = setInterval(() => {
      const newValue = timerRef.current - new Date().getTime();
      if (newValue >= 0) setTime(newValue);
      else setTimeOver(true);
    }, 10);
  };

  const handlePause = () => {
    if (!intervalRef.current) return;

    elapsedTimeRef.current += Date.now() - startTimeRef.current;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    startTimeRef.current = 0;
    elapsedTimeRef.current = 0;
    setConfig(structuredClone(Config));
    setTimeOver(false);
  };

  const formatTime = (time) => {
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
      <h1 className="mt-30 text-red-700 font-normal text-5xl">Timer</h1>
      <div className="my-10 bg-transparent justify-center text-xl flex gap-3">
        {timerOrder.map((orderKey) => {
          const data = config[orderKey];
          return (
            <div key={crypto.randomUUID()}>
              <input
                name={orderKey}
                type="text"
                list={`${orderKey} - datalist`}
                value={data.value}
                onChange={handleChange({ key: orderKey })}
                placeholder={data.placeholder}
                className="text-white border border-gray-500/40 shadow-xl ring-1 rounded-lg text-4xl max-w-35 text-center p-2 placeholder:text-center"
              />
              {orderKey !== "ss" && (
                <span
                  className={`ml-2 text-white inline-block text-4xl text-center`}
                >
                  :
                </span>
              )}
              <datalist id={`${orderKey} - datalist`}>
                <option value="10"></option>
                <option value="20"></option>
                <option value="30"></option>
                <option value="45"></option>
              </datalist>
            </div>
          );
        })}
      </div>
      <div className="ml-15 inline-block w-auto text-white text-7xl min-w-110">
        {formatTime(time)}
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
      {timeOver && (
        <div className="text-4xl font-normal text-rose-600 animate-bounce">
          Time Over
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
