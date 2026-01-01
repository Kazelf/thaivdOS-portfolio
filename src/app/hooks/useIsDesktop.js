"use client";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export const useIsDesktop = () => {
  const isDesktopRaw = useMediaQuery({ query: "(min-width: 1024px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    isDesktopRaw, //UI
    isDesktopSafe: mounted ? isDesktopRaw : true, //Data
  };
};
