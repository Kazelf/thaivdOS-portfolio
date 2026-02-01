import React from "react";
import clsx from "clsx";
import { useWordleStore } from "@/app/store";

const getCellStatus = (solution, guess, index) => {
  if (!guess[index]) return "";
  if (solution[index] === guess[index]) return "correct";
  if (solution.includes(guess[index])) return "present";
  return "absent";
};

const Row = ({ guess, isActive }) => {
  const solution = useWordleStore((s) => s.solution);

  return (
    <div className="flex gap-2 mb-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const letter = guess[i] || "";
        const status = guess ? getCellStatus(solution, guess, i) : "";

        const colors = {
          correct: "bg-green-500 border-green-500 text-white",
          present: "bg-yellow-500 border-yellow-500 text-white",
          absent: "bg-gray-500 border-gray-500 text-white",
          "": "border-base-300",
        };

        return (
          <div
            key={i}
            className={clsx(
              "w-10 h-10 bg-base rounded-sm border-2 flex-center text-xl font-bold uppercase",
              isActive ? colors[status] || colors[""] : "border-neutral/50",
            )}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
