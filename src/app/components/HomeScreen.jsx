"use client";
import React from "react";
import Image from "next/image";
import { locations, screenApps } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import { useGSAP, Draggable } from "@/lib/gsapClient";

const projects = locations.work?.children ?? [];

const HomeScreen = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow, closeWindow, windows } = useWindowStore();

  const toggleApp = (app) => {
    const window = windows[app.id];

    if (!window) return;

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(windows);
  };

  const openItem = (item) => {
    if (item.kind === "app") return toggleApp(item);
    if (item.kind === "folder") {
      setActiveLocation(item);
      return openWindow("finder");
    }
    if (item.fileType === "pdf") return openWindow("resume");
    if (["fig", "url"].includes(item.fileType) && item.url)
      return window.open(item.url, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderApps = (apps) => (
    <ul className="flex flex-col flex-wrap max-lg:flex-row">
      {apps.map((item) => (
        <li
          key={item.id}
          className="app-icon text-white"
          onClick={() => openItem(item)}
        >
          <Image src={item.icon} alt={item.name} width={40} height={40} />
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="absolute w-full top-10 left-0 z-0 max-lg:z-20 p-4 flex justify-between">
      <div>{renderApps(screenApps)}</div>

      <div className="max-lg:hidden">{renderApps(projects)}</div>
    </section>
  );
};

export default HomeScreen;
