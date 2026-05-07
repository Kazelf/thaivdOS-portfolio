"use client";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
} from "lucide-react";
import { useIsDesktop } from "../../hooks";

const SafariHeaderSlot = () => {
  const { isDesktopSafe } = useIsDesktop();

  if (!isDesktopSafe) {
    return <p className="w-full">Experiences</p>;
  }

  return (
    <>
      <PanelLeft className="icon ml-10" />

      <div className="flex items-center">
        <ChevronLeft className="icon" />
        <ChevronRight className="icon" />
      </div>

      <div className="flex flex-1 p-1 bg-base-200 rounded border border-base-300">
        <Search className="icon" />
        <input
          type="text"
          placeholder="Search or enter website name"
          className="flex-1 font-normal"
          disabled
        />
      </div>

      <div className="flex items-center ml-10 gap-5">
        <Plus className="icon" />
        <Copy className="icon" />
      </div>
    </>
  );
};

export default SafariHeaderSlot;
