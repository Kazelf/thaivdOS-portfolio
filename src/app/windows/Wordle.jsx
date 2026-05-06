import React, { useState, useEffect } from "react";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { Row, Keyboard, Instruction } from "../components";
import { useWordleStore } from "../store";
import WordleHeaderSlot from "../components/headerslot/WordleHeaderSlot";

const Wordle = () => {
  const guesses = useWordleStore((s) => s.guesses);
  const solution = useWordleStore((s) => s.solution);
  const currentRow = useWordleStore((s) => s.currentRow);
  const status = useWordleStore((s) => s.status);
  const message = useWordleStore((s) => s.message);
  const reset = useWordleStore((s) => s.reset);
  const addLetter = useWordleStore((s) => s.addLetter);
  const removeLetter = useWordleStore((s) => s.removeLetter);
  const submitGuess = useWordleStore((s) => s.submitGuess);
  const showInfo = useWordleStore((s) => s.showInfo);
  const toggleInfo = useWordleStore((s) => s.toggleInfo);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== "playing") return;
      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") removeLetter();
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, addLetter, removeLetter, submitGuess]);

  return (
    <div className="window-content flex-center flex-col relative">
      {showInfo && <Instruction open={showInfo} onClose={toggleInfo} />}

      {guesses.map((g, i) => (
        <Row
          key={i}
          guess={g}
          isActive={i < currentRow}
          solution={solution}
        />
      ))}

      {message !== "" && message}

      {status !== "playing" && (
        <button
          onClick={reset}
          className="px-4 py-1 mt-2 bg-primary text-primary-foreground hover:bg-primary-200 rounded"
        >
          New game
        </button>
      )}

      <Keyboard />
    </div>
  );
};

const WordleWindow = WindowWrapper(Wordle, "wordle", {
  windowClassName: "window w-xl",
  HeaderSlot: WordleHeaderSlot,
});

export default WordleWindow;
