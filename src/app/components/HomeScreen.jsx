"use client";
import React from "react";
import Image from "next/image";
import { locations, dockApps } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import { useGSAP, Draggable } from "@/lib/gsapClient";

const projects = locations.work?.children ?? [];

const HomeScreen = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow, closeWindow, windows } = useWindowStore();
  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (!window) return;

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(windows);
  };

  // useGSAP(() => {
  //   Draggable.create(".app-icon");
  // }, []);

  return (
    <section className="absolute w-full top-10 left-0 z-0 p-4 flex justify-between">
      <ul>
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <li
            key={id}
            className="app-icon text-white relative flex justify-center"
            onClick={() => toggleApp({ id, canOpen })}
          >
            <Image
              src={`/icons/apps/${icon}`}
              alt={name}
              width={40}
              height={40}
            />
            <p>{name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className="app-icon text-white"
            onClick={() => handleOpenProjectFinder(project)}
          >
            <Image
              src={project.icon}
              alt={project.name}
              width={40}
              height={40}
            />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeScreen;
