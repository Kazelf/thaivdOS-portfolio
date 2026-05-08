"use client";
import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "../store/window";
import { gsap, useGSAP, Draggable } from "@/lib/gsapClient";
import { useIsDesktop } from "../hooks";
import WindowControls from "../components/WindowControls";

const WindowWrapperClient = ({
  Component,
  windowKey,
  title,
  windowClassName,
  HeaderSlot,
  ...props
}) => {
  const { focusWindow, windows, setWindowBounds } = useWindowStore();
  const { isOpen, isFullscreen, zIndex, data, bounds } = windows[windowKey];
  const ref = useRef(null);
  const { isDesktopSafe } = useIsDesktop();
  const effectiveZIndex = isDesktopSafe ? (isFullscreen ? 3000 : zIndex) : 3000;

  const resolvedTitle = typeof title === "function" ? title(data) : title;

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
    if (!isDesktopSafe || isFullscreen) return;

    const header = el.querySelector(".window-header");
    if (!header) return;

    const [instance] = Draggable.create(el, {
      trigger: header,
      onDragEnd: function onDragEnd() {
        setWindowBounds(windowKey, {
          x: this.x,
          y: this.y,
          width: bounds?.width ?? null,
          height: bounds?.height ?? null,
        });
      },
      onPress: () => {
        focusWindow(windowKey);
      },
    });

    return () => instance.kill();
  }, [isDesktopSafe, data, isFullscreen, bounds, setWindowBounds, windowKey]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.display = isOpen ? "block" : "none";

    if (!isOpen) return;

    if (isFullscreen) {
      gsap.set(el, { x: 0, y: 0 });
      el.style.left = "0";
      el.style.top = "0";
      return;
    }

    el.style.left = "";
    el.style.top = "";
    el.style.transform = "";

    if (isDesktopSafe && bounds?.x == null && bounds?.y == null) {
      const winEl = el.firstElementChild;
      const applyCenteredBounds = () => {
        const rect = winEl?.getBoundingClientRect();
        if (!rect || rect.width <= 0 || rect.height <= 0) return false;

        const x = Math.max(0, Math.round((window.innerWidth - rect.width) / 2));

        setWindowBounds(windowKey, {
          x,
          width: rect.width,
          height: rect.height,
        });

        gsap.set(el, { x });

        return true;
      };

      if (applyCenteredBounds()) return;

      const frameId = window.requestAnimationFrame(() => {
        applyCenteredBounds();
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    if (bounds?.x != null || bounds?.y != null) {
      gsap.set(el, {
        x: bounds?.x ?? 0,
        y: bounds?.y ?? 0,
      });
    }
  }, [isOpen, isFullscreen, bounds, isDesktopSafe, setWindowBounds, windowKey]);

  return (
    <section
      id={windowKey}
      ref={ref}
      style={{ zIndex: effectiveZIndex }}
      className={`fixed hidden ${
        isFullscreen ? "inset-0" : "top-0 lg:top-1/12"
      }`}
    >
      <div
        className={`${windowClassName}`}
        style={
          isFullscreen
            ? {
                width: "100vw",
                height: "100dvh",
                minHeight: "100dvh",
                borderRadius: 0,
              }
            : undefined
        }
      >
        <div className="window-header">
          <WindowControls target={windowKey} />
          {resolvedTitle && <h2 className="w-full">{resolvedTitle}</h2>}
          {HeaderSlot && <HeaderSlot />}
        </div>

        <Component {...props} />
      </div>
    </section>
  );
};

export default WindowWrapperClient;
