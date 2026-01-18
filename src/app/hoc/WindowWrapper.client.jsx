"use client";
import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "../store/window";
import { gsap, useGSAP, Draggable } from "@/lib/gsapClient";
import { useIsDesktop } from "../hooks";

const WindowWrapperClient = ({ Component, windowKey, ...props }) => {
  const { focusWindow, windows } = useWindowStore();
  const { isOpen, zIndex, data } = windows[windowKey];
  const ref = useRef(null);
  const { isDesktopSafe } = useIsDesktop();

  useGSAP(() => {
    const el = ref.current;
    if (!el || !isOpen) return;

    el.style.display = "block";

    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
    );
  }, [isOpen]);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    Draggable.get(el)?.kill();
    if (!isDesktopSafe) return;

    const header = el.querySelector(".window-header");
    if (!header) return;

    const [instance] = Draggable.create(el, {
      trigger: header,
      onPress: () => {
        focusWindow(windowKey);
      },
    });

    return () => instance.kill();
  }, [isDesktopSafe, data]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.display = isOpen ? "block" : "none";
  }, [isOpen]);

  return (
    <section
      id={windowKey}
      ref={ref}
      style={{ zIndex }}
      className="absolute top-0 lg:top-1/12 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden"
    >
      <Component {...props} />
    </section>
  );
};

export default WindowWrapperClient;
