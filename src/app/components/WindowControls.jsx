"use client";
import React from "react";
import { XIcon, ChevronLeft, Minus, Maximize2, Minimize2 } from "lucide-react";
import useWindowStore from "../store/window";
import useFolderStore from "../store/folder";
import { useIsDesktop } from "../hooks";

const WindowControls = ({ target }) => {
  const { closeWindow, toggleFullscreenWindow, windows } =
    useWindowStore();
  const { goBack, currentFolder } = useFolderStore();
  const { isDesktopSafe } = useIsDesktop();
  const isFullscreen = windows[target]?.isFullscreen;

  // canGoBack chỉ áp dụng cho Finder và khi ở mobile
  const showGoBack =
    target === "finder" &&
    !isDesktopSafe &&
    currentFolder &&
    currentFolder.id !== "root";

  return (
    <div className="flex gap-2">
      <button
        onPointerUp={() => closeWindow(target)}
        className="p-1 cursor-pointer rounded-md hover:bg-red-400 hover:text-white"
        aria-label="Close"
      >
        <XIcon className="h-5 w-5" />
      </button>

      {isDesktopSafe && (
        <>
          <button
            onPointerUp={() => closeWindow(target)}
            className="p-1 cursor-pointer rounded-md hover:bg-yellow-400 hover:text-white"
            aria-label="Minimize"
          >
            <Minus className="h-5 w-5" />
          </button>

          <button
            onPointerUp={() => toggleFullscreenWindow(target)}
            className="p-1 cursor-pointer rounded-md hover:bg-green-500 hover:text-white"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </>
      )}

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
