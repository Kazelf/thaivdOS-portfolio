"use client";
import React from "react";
import { useTheme } from "next-themes";
import MenuWrapper from "@/app/hoc/MenuWrapper";

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleDark = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <div className="w-full flex justify-between items-center py-1">
        <p>Dark Mode</p>
        <div className="px-2.5">
          <label className="switch-toggle">
            <input type="checkbox" checked={isDark} onChange={toggleDark} />
            <span className="slider-toggle" />
          </label>
        </div>
      </div>

      <hr className="my-2 opacity-20" />
    </>
  );
};

const SettingsMenuWrapped = MenuWrapper(SettingsMenu, "settings");

export default SettingsMenuWrapped;
