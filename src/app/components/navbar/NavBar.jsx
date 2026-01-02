"use client";
import React from "react";
import dayjs from "dayjs";
import { navLinks } from "../../constants";
import { NavBarItem } from "..";
import useWindowStore from "../../store/window";
import useSystemStore from "../../store/system";
import { Wifi, SquareCode, Settings2 } from "lucide-react";

const NavBar = () => {
  const pStyles = "text-sm transition-all";
  const { openWindow } = useWindowStore();
  const { toggleMenu, activeMenu } = useSystemStore();
  console.log(activeMenu);

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
        <NavBarItem onClick={() => toggleMenu("wifi")}>
          <Wifi className="icon" />
        </NavBarItem>

        <NavBarItem onClick={() => toggleMenu("settings")}>
          <Settings2 className="icon" />
        </NavBarItem>

        <time className={`${pStyles}`}>
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
