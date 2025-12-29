"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { Search } from "lucide-react";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.url)
      return window.open(item.url, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <Image src={item.icon} alt={item.name} width={16} height={16} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-3xl max-lg:w-2xl window">
      <div className="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="grid grid-cols-4 bg-base">
        <div className="side-bar col-span-1 p-3 bg-base-200 border-r border-r-base-300">
          {renderList("Favourites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <ul className="content col-span-3 p-4 flex flex-wrap gap-4 items-start">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className="app-icon"
              onClick={() => openItem(item)}
            >
              <Image src={item.icon} alt={item.name} width={60} height={60} />
              <p className="text-center">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
