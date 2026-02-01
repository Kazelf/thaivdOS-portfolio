import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WORDS } from "../constants";

const pickRandomWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();

const useWordleStore = create(
  immer((set, get) => ({
    solution: pickRandomWord(),
    guesses: Array(6).fill(""),
    currentRow: 0,
    status: "playing", // playing | won | lost
    keyStatuses: {}, // { char 'A': 'correct' | 'present' | 'absent' }
    message: "",

    addLetter: (letter) => {
      set((state) => {
        if (state.status !== "playing") return;
        const row = state.currentRow;
        if (state.guesses[row].length < 5) {
          state.guesses[row] += letter;
        }
      });
    },

    removeLetter: () => {
      set((state) => {
        if (state.status !== "playing") return;
        const row = state.currentRow;
        state.guesses[row] = state.guesses[row].slice(0, -1);
      });
    },

    submitGuess: () => {
      const { guesses, currentRow, solution } = get();
      const guess = guesses[currentRow];

      set((state) => {
        //check if input 5 letters word
        if (guess.length < 5) {
          state.message = "Too short!";
          return;
        }

        //check if it is real word
        if (!WORDS.includes(guess.toLowerCase())) {
          state.message = "Word not found!";
          return;
        }

        // update keyboard status
        const solArr = solution.split("");
        const guessArr = guess.split("");

        guessArr.forEach((ch, i) => {
          let status = "absent";
          if (solution[i] === ch) status = "correct";
          else if (solArr.includes(ch)) status = "present";

          const prev = state.keyStatuses[ch];
          if (
            prev === "correct" ||
            (prev === "present" && status === "absent")
          ) {
            return;
          }
          state.keyStatuses[ch] = status;
        });

        state.currentRow += 1;
        state.message = "";

        //win
        if (guess === solution) {
          state.status = "won";
          state.message = "You won!";
          return;
        }

        //lost
        if (state.currentRow === 6) {
          state.status = "lost";
          state.message = `You lose! Answer is ${state.solution}`;
          return;
        }
      });
    },

    reset: () => {
      set((state) => {
        state.solution = pickRandomWord();
        state.guesses = Array(6).fill("");
        state.currentRow = 0;
        state.status = "playing";
        state.keyStatuses = {};
        state.message = "";
      });
    },
  })),
);

export default useWordleStore;
