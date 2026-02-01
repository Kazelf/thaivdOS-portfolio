import React, { useEffect } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls, Row, Keyboard } from "../components";
import { useWordleStore } from "../store";

const Wordle = () => {
  const guesses = useWordleStore((s) => s.guesses);
  const currentRow = useWordleStore((s) => s.currentRow);
  const status = useWordleStore((s) => s.status);
  const message = useWordleStore((s) => s.message);
  const reset = useWordleStore((s) => s.reset);
  const addLetter = useWordleStore((s) => s.addLetter);
  const removeLetter = useWordleStore((s) => s.removeLetter);
  const submitGuess = useWordleStore((s) => s.submitGuess);

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
      </div>

      <div className="window-content flex-center flex-col">
        {guesses.map((g, i) => (
          <Row key={i} guess={g} isActive={i < currentRow} />
        ))}

        {message !== " " && message}

        {status !== "playing" && (
          <div className="text-center">
            <button
              onClick={reset}
              className="px-4 py-1 bg-primary text-primary-foreground hover:bg-primary-200 rounded"
            >
              New game
            </button>
          </div>
        )}

        <Keyboard />
      </div>
    </div>
  );
};

const WordleWindow = WindowWrapper(Wordle, "wordle");

export default WordleWindow;
