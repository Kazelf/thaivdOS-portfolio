"use client";
import React from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { techStack } from "../constants";
import { CheckIcon } from "lucide-react";

const Terminal = () => {
  return (
    <div className="w-xl window">
      <div className="window-header">
        <WindowControls target="terminal" />
        <h2 className="w-full">Tech stack</h2>
      </div>

      <div className="flex flex-col gap-5 font-mono bg-base p-4">
        <div className="tech-stack">
          <span className="font-bold">@thaivd %</span>
          show tech stack
        </div>
        <div className="grid grid-cols-12">
          <p className="col-start-2 col-span-3">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="py-4 border-y border-dashed border-y-base-600">
          {techStack.map(({ category, items }) => (
            <li key={category} className="grid grid-cols-12 items-center">
              <CheckIcon className="col-span-1 text-green-700 size-4" />
              <h3 className="col-span-3 text-green-700 font-semibold">
                {category}
              </h3>
              <ul className="flex items-center gap-1">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footNote">
          <p className="flex text-green-500 items-center gap-2">
            <CheckIcon className="size-4" />4 of 4 stacks loaded successfully
            (100%)
          </p>
          <p>Render time: 6ms</p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
