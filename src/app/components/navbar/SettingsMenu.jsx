"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapClient";
import useSystemStore from "@/app/store/system";
import { useClickOutside } from "@/app/hooks";
import { useTheme } from "next-themes";

const SettingsMenu = ({ triggerRef }) => {
  const menuRef = useRef(null);
  const { activeMenu, closeMenu } = useSystemStore();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleDark = () => {
    setTheme(isDark ? "light" : "dark");
  };

  useClickOutside(menuRef, closeMenu, [triggerRef]);

  const isOpen = activeMenu === "settings";
  useGSAP(() => {
    if (!isOpen) return;
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
        <p>Dark Mode</p>
        <div className="px-2.5">
          <label className="switch-toggle">
            <input type="checkbox" checked={isDark} onChange={toggleDark} />
            <span className="slider-toggle" />
          </label>
        </div>
      </div>

      <hr className="my-2 opacity-20" />
    </div>
  );
};

export default SettingsMenu;
