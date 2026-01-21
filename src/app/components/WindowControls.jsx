"use client";
import React from "react";
import { XIcon, ChevronLeft } from "lucide-react";
import useWindowStore from "../store/window";
import useFolderStore from "../store/folder";

const WindowControls = ({ target, canGoBack = false }) => {
  const { closeWindow } = useWindowStore();
  const { goBack } = useFolderStore();
  const showGoBack = canGoBack && target === "finder";

  return (
    <div className="flex gap-2">
      <button
        onPointerUp={() => closeWindow(target)}
        className="p-1 cursor-pointer rounded-md hover:bg-red-400 hover:text-white"
        aria-label="Close"
      >
        <XIcon className="h-5 w-5" />
      </button>

      {showGoBack && (
        <button
          onPointerUp={() => goBack()}
          className="p-1 cursor-pointer"
          aria-label="Go Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default WindowControls;
