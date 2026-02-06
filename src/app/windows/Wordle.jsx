import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Info } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls, Row, Keyboard, Instruction } from "../components";
import { useWordleStore } from "../store";

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

  const [info, setInfo] = useState(true);
  const toggleInfo = () => {
    setInfo(!info);
  };

  //prevent click button when press enter
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

  //render letter when press key
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
    <div className="window w-xl">
      <div className="window-header">
        <WindowControls target="wordle" />
        <h2 className="w-full">Wordle Game</h2>
        <button
          onPointerUp={() => toggleInfo()}
          className={clsx(
            "p-1 cursor-pointer rounded-md hover:bg-base-200",
            info && "bg-base-300",
          )}
          aria-label="Close"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      <div className="window-content flex-center flex-col relative">
        {info && <Instruction open={info} onClose={() => setInfo(false)} />}

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
    </div>
  );
};

const WordleWindow = WindowWrapper(Wordle, "wordle");

export default WordleWindow;
