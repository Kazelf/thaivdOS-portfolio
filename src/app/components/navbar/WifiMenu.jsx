"use client";
import React, { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapClient";
import useSystemStore from "@/app/store/system";
import { useClickOutside } from "@/app/hooks";

const WifiMenu = ({ triggerRef }) => {
  const menuRef = useRef(null);
  const { activeMenu, closeMenu, wifi, toggleWifi } = useSystemStore();

  useClickOutside(menuRef, closeMenu, [triggerRef]);

  const isOpen = activeMenu === "wifi";
  useGSAP(() => {
    const el = menuRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power3.out",
        pointerEvents: "auto",
      }
    );
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-12 right-2 w-xs rounded-xl bg-base/95 backdrop-blur-2xl shadow-lg p-3"
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
    </div>
  );
};

export default WifiMenu;
