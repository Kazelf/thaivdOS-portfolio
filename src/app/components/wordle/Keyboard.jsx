import React from "react";
import { useWordleStore } from "@/app/store";
const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

const Keyboard = () => {
  const addLetter = useWordleStore((s) => s.addLetter);
  const removeLetter = useWordleStore((s) => s.removeLetter);
  const submitGuess = useWordleStore((s) => s.submitGuess);
  const keyStatuses = useWordleStore((s) => s.keyStatuses);

  const handleClick = (key) => {
    if (key === "ENTER") submitGuess();
    else if (key === "DEL") removeLetter();
    else addLetter(key);
  };

  const getColor = (key) => {
    const status = keyStatuses[key];
    if (status === "correct") return "bg-green-500";
    if (status === "present") return "bg-yellow-500";
    if (status === "absent") return "bg-gray-500";
    return "bg-gray-400 hover:bg-gray-300";
  };

  return (
    <div className="mt-4 space-y-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((key) => (
            <div
              key={key}
              onClick={() => handleClick(key)}
              className={`px-3 py-2 cursor-pointer select-none text-white rounded font-semibold ${getColor(key)}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
