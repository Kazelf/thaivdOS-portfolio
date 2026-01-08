"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapClient";
import useSystemStore from "../store/system";
import { useClickOutside } from "../hooks";

const MenuWrapperClient = ({
  Component,
  menuKey,
  triggerRef,
  menuPosition,
  ...props
}) => {
  const menuRef = useRef(null);
  const { activeMenu, closeMenu } = useSystemStore();

  useClickOutside(menuRef, closeMenu, [triggerRef]);

  const isOpen = activeMenu === menuKey;
  useGSAP(() => {
    if (!isOpen) return;
    const el = menuRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power3.out",
        pointerEvents: "auto",
      }
    );
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${menuPosition} rounded-xl bg-base/95 backdrop-blur-2xl shadow-lg p-3`}
    >
      <Component {...props} />
    </div>
  );
};

export default MenuWrapperClient;
