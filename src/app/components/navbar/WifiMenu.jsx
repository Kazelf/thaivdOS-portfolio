"use client";
import React, { useRef } from "react";
import useSystemStore from "@/app/store/system";
import { useClickOutside } from "@/app/hooks";
import { Check } from "lucide-react";

const WifiMenu = () => {
  const menuRef = useRef(null);
  const { activeMenu, closeMenu, wifi, toggleWifi } = useSystemStore();

  useClickOutside(menuRef, closeMenu);
  if (activeMenu !== "wifi") return null;

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-12 right-20 z-50 w-xs rounded-xl bg-base/80 backdrop-blur-2xl shadow-lg p-3"
    >
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

      <p className="text-xs opacity-60 mb-1">Known Networks</p>
      <ul className="text-sm space-y-1">
        <li className="hover:bg-base/10 p-1 rounded">Home Wifi</li>
        <li className="hover:bg-base/10 p-1 rounded">Coffee Shop</li>
      </ul>
    </div>
  );
};

export default WifiMenu;
