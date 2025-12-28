"use client";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { gsap, useGSAP } from "@/lib/gsapClient";

import { dockApps } from "../constants";
import useWindowStore from "../store/window";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return () => {};

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

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

  return (
    <section
      id="dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden"
    >
      <div
        ref={dockRef}
        className="dock-container bg-white/20 backdrop-blur-md flex justify-between items-end rounded-2xl p-1.5 gap-1.5"
      >
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon size-14 3xl:size-20 cursor-pointer"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={50}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt="name"
                loading="lazy"
                className={`w-full h-full p-1 ${canOpen ? "" : "opacity-60"}`}
              />
            </button>
          </div>
        ))}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="bg-indigo-200! text-indigo-800! shadow-2xl! text-xs!"
        />
      </div>
    </section>
  );
};

export default Dock;
