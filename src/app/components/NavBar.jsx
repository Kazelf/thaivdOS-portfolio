"use client";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants";
import useWindowStore from "../store/window";
import { Wifi, Search, CircleUserRound, SlidersHorizontal } from "lucide-react";

const NavBar = () => {
  const pStyles = "text-sm transition-all";
  const { openWindow } = useWindowStore();

  return (
    <nav className="bg-base-300/70 backdrop-blur-3xl select-none flex justify-between items-center p-3 px-5 fixed top-0 left-0 right-0 z-10 ">
      <div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
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
        <ul className="flex items-center gap-7 max-sm:hidden">
          {/* {navIcons.map((icon) => (
            <li key={icon.id}>
              <Image
                src={icon.image}
                alt={`icon ${icon.id}`}
                className="icon text-blue"
                width={16}
                height={16}
              />
            </li>
          ))} */}

          <li key={"wifi"}>
            <Wifi className="icon" />
          </li>
          <li key={"search"}>
            <Search className="icon" />
          </li>
          <li key={"user"}>
            <CircleUserRound className="icon" />
          </li>
          <li key={"themes"}>
            <SlidersHorizontal className="icon" />
          </li>
        </ul>

        <time className={`${pStyles} font-semibold`}>
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
