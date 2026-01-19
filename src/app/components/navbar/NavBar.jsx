"use client";
import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks } from "../../constants";
import { NavBarItem, WifiMenu, SettingsMenu, SystemMenu } from "..";
import { useIsDesktop } from "@/app/hooks";
import { useSystemStore, useWindowStore } from "@/app/store";
import { Wifi, SquareCode, Settings2 } from "lucide-react";

const NavBar = () => {
  const wifiBtnRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const systemBtnRef = useRef(null);
  const { isDesktopSafe } = useIsDesktop();

  //clock helper
  const timeFormat = isDesktopSafe ? "ddd MMM D h:mm A" : "H:mm";
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(dayjs());

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const pStyles = "text-sm transition-all";
  const { openWindow } = useWindowStore();
  const { toggleMenu, activeMenu } = useSystemStore();

  return (
    <nav className="z-10000 bg-base/70 backdrop-blur-3xl select-none flex justify-between items-center p-1 px-5 fixed top-0 left-0 right-0">
      <div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
        <NavBarItem
          name={"system"}
          active={activeMenu === "system"}
          onClick={() => toggleMenu("system")}
        >
          <SquareCode ref={systemBtnRef} className="icon font-bold scale-120" />
        </NavBarItem>
        {activeMenu === "system" && (
          <SystemMenu
            triggerRef={systemBtnRef}
            menuPosition={"top-12 left-2 w-3xs"}
          />
        )}

        <p className={`text-lg font-bold`}>thaivdOS</p>

        <ul className="flex items-center gap-5 max-sm:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <p
                className={`${pStyles} cursor-pointer hover:underline`}
                onClick={() => openWindow(link.type)}
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
        <NavBarItem
          name={"wifi"}
          active={activeMenu === "wifi"}
          onClick={() => toggleMenu("wifi")}
        >
          <Wifi ref={wifiBtnRef} className="icon" />
        </NavBarItem>
        {activeMenu === "wifi" && (
          <WifiMenu
            triggerRef={wifiBtnRef}
            menuPosition={"top-12 right-2 w-xs"}
          />
        )}

        <NavBarItem
          name={"settings"}
          active={activeMenu === "settings"}
          onClick={() => toggleMenu("settings")}
        >
          <Settings2 ref={settingsBtnRef} className="icon" />
        </NavBarItem>
        {activeMenu === "settings" && (
          <SettingsMenu
            triggerRef={settingsBtnRef}
            menuPosition={"top-12 right-2 w-xs"}
          />
        )}

        <time className={`${pStyles} font-medium`}>
          {now.format(timeFormat)}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
