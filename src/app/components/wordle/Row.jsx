import React, { useRef } from "react";
import clsx from "clsx";
import { useWordleStore } from "@/app/store";
import { gsap, useGSAP } from "@/lib/gsapClient";

const getCellStatus = (solution, guess, index) => {
  if (!guess[index]) return "";
  if (solution[index] === guess[index]) return "correct";
  if (solution.includes(guess[index])) return "present";
  return "absent";
};

const Row = ({ guess, isActive }) => {
  const solution = useWordleStore((s) => s.solution);

  const rowRef = useRef(null);

  useGSAP(
    () => {
      if (!isActive) return;

      const tiles = rowRef.current.querySelectorAll(".tile");
      if (!tiles.length) return;

      tiles.forEach((tile, i) => {
        const status = guess ? getCellStatus(solution, guess, i) : "";
        const colors = {
          correct: "bg-green-600 border-green-600 text-white",
          present: "bg-yellow-500 border-yellow-500 text-white",
          absent: "bg-gray-500 border-gray-500 text-white",
        };

        const tl = gsap.timeline({ delay: i * 0.15 });

        tl.to(tile, {
          rotateX: 90,
          duration: 0.1,
          ease: "power2.in",
          onComplete: () => {
            // 👉 ĐỔI MÀU Ở GIỮA
            tile.classList.remove("bg-base");
            tile.classList.add(...(colors[status]?.split(" ") || []));
          },
        }).to(tile, {
          rotateX: 0,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [isActive] },
  );

  return (
    <div ref={rowRef} className="flex gap-2 mb-2" style={{ perspective: 600 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const letter = guess[i] || "";

        return (
          <div
            key={i}
            className={clsx(
              "tile w-10 h-10 bg-base rounded-sm border-2 flex-center text-xl font-bold uppercase",
              isActive
                ? "border-none"
                : letter === ""
                  ? "border-neutral/30"
                  : "border-neutral/50",
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
