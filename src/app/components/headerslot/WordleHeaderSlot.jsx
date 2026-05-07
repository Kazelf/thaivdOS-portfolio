"use client";
import React from "react";
import { Info } from "lucide-react";
import clsx from "clsx";
import { useWordleStore } from "../../store";

const WordleHeaderSlot = () => {
  const showInfo = useWordleStore((s) => s.showInfo);
  const toggleInfo = useWordleStore((s) => s.toggleInfo);

  return (
    <>
      <h2 className="w-full">Wordle Game</h2>
      <button
        onPointerUp={toggleInfo}
        className={clsx(
          "p-1 cursor-pointer rounded-md hover:bg-base-200",
          showInfo && "bg-base-300",
        )}
        aria-label="Info"
      >
        <Info className="h-5 w-5" />
      </button>
    </>
  );
};

export default WordleHeaderSlot;
