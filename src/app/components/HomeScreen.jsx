"use client";
import React from "react";
import Image from "next/image";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import { useGSAP, Draggable } from "@/lib/gsapClient";

const projects = locations.work?.children ?? [];

const HomeScreen = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  // useGSAP(() => {
  //   Draggable.create(".app-icon");
  // }, []);

  return (
    <section className="absolute top-15 left-4">
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
              width={60}
              height={60}
            />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeScreen;
