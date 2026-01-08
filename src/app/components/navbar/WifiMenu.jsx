"use client";
import React from "react";
import { Check } from "lucide-react";
import MenuWrapper from "@/app/hoc/MenuWrapper";
import useSettingsStore from "@/app/store/settings";

const WifiMenu = () => {
  const { wifi, toggleWifi } = useSettingsStore();

  return (
    <>
      <div className="w-full flex justify-between items-center py-1">
        <p>Wi-Fi</p>
        <div className="px-2.5">
          <label className="switch-toggle">
            <input type="checkbox" checked={wifi} onChange={toggleWifi} />
            <span className="slider-toggle" />
          </label>
        </div>
      </div>

      <hr className="my-2 opacity-20" />

      <div className="w-full flex flex-col">
        <p className="text-xs opacity-60 mb-1 flex items-start">
          Known Networks
        </p>
        <ul className="text-sm space-y-1 ">
          <li className="hover:bg-base/10 p-1 rounded flex items-start">
            Home Wifi
          </li>
          <li className="hover:bg-base/10 p-1 rounded flex items-start">
            Coffee Shop
          </li>
        </ul>
      </div>
    </>
  );
};

const WifiMenuWrapped = MenuWrapper(WifiMenu, "wifi");

export default WifiMenuWrapped;
