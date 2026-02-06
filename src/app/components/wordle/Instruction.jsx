import React from "react";
import { Row } from "..";

const Instruction = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex flex-col items-center z-10 w-[60%] max-w-md bg-base rounded-lg p-5 shadow-lg">
        <h3 className="text-lg font-bold mb-3 text-center">How to play</h3>

        <div className="text-sm space-y-2">
          <p>• Guess the WORDLE in 6 tries.</p>
          <p>• Each guess must be a valid 5-letter word.</p>
          <p>
            • The color of the tiles will change to show how close your guess
            was.
          </p>
        </div>

        <div className="bg-base-300 p-2 rounded-xl text-sm space-y-2 mt-2 flex flex-col items-center">
          <h3 className="font-bold mb-3 text-center">Example</h3>

          <Row guess={"table"} isActive={true} solution={"flame"} />

          <p className="text-justify">
            • <b>T, B</b> aren't in the target word at all. <b>A, L</b> is in
            the word but in the wrong spot. <b>E</b> is in the word and in the
            correct spot.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-1 rounded bg-primary text-primary-foreground hover:bg-primary-200"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Instruction;
