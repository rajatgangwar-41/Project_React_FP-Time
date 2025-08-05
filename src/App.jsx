import { useState } from "react";
import Stopwatch from "./components/stopwatch";
import Timer from "./components/timer";
import Digitalclock from "./components/digitalclock";

function App() {
  const [choice, setChoice] = useState(null);

  const renderComponent = () => {
    switch (choice) {
      case "stopwatch":
        return <Stopwatch />;
      case "timer":
        return <Timer />;
      case "digitalclock":
        return <Digitalclock />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900">
      {!choice ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-200">
            Choose Your Option
          </h1>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => setChoice("stopwatch")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              Stopwatch
            </button>
            <button
              onClick={() => setChoice("timer")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Timer
            </button>
            <button
              onClick={() => setChoice("digitalclock")}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition"
            >
              Digital Clock
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-center">{renderComponent()}</div>
          <button
            onClick={() => setChoice(null)}
            className="absolute top-10 left-10 cursor-pointer mt-4 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            ⬅ Go Back
          </button>
        </>
      )}
    </div>
  );
}

export default App;
