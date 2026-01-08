"use client";
import React, { useRef } from "react";
import dayjs from "dayjs";
import { navLinks } from "../../constants";
import { NavBarItem, WifiMenu, SettingsMenu } from "..";
import { useIsDesktop } from "@/app/hooks";
import useWindowStore from "../../store/window";
import useSettingsStore from "../../store/settings";
import { Wifi, SquareCode, Settings2 } from "lucide-react";

const NavBar = () => {
  const wifiBtnRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const { isDesktopSafe } = useIsDesktop();
  const timeFormat = isDesktopSafe ? "ddd MMM D h:mm A" : "H:mm";

  const pStyles = "text-sm transition-all";
  const { openWindow } = useWindowStore();
  const { toggleMenu, activeMenu } = useSettingsStore();

  return (
    <nav className="bg-base/70 backdrop-blur-3xl select-none flex justify-between items-center p-1 px-5 fixed top-0 left-0 right-0 z-100 ">
      <div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
        <SquareCode className="icon font-bold scale-120" />
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
        {activeMenu === "wifi" && <WifiMenu triggerRef={wifiBtnRef} />}

        <NavBarItem
          name={"settings"}
          active={activeMenu === "settings"}
          onClick={() => toggleMenu("settings")}
        >
          <Settings2 ref={settingsBtnRef} className="icon" />
        </NavBarItem>
        {activeMenu === "settings" && (
          <SettingsMenu triggerRef={settingsBtnRef} />
        )}

        <time className={`${pStyles} font-medium`}>
          {dayjs().format(timeFormat)}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
