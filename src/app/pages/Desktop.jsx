import React from "react";
import dynamic from "next/dynamic";
import { NavBar, HeroSection, Dock, ScreenApps } from "../components";
import {
  Terminal,
  Resume,
  Finder,
  Contact,
  Youtube,
  Text,
  ImageWindow,
  Safari,
  Spotify,
  VSCode,
  Wordle,
} from "../windows";
import { useIsDesktop } from "../hooks";
import { useSystemStore, useWindowStore } from "../store";

// Loaded only when opened; the emulator itself runs inside an iframe.
const Steam = dynamic(() => import("../windows/Steam"), { ssr: false });

const Desktop = () => {
  const { isDesktopSafe } = useIsDesktop();
  const { brightness } = useSystemStore();
  const isVSCodeOpen = useWindowStore(
    (state) => state.windows["vscode"].isOpen,
  );
  const isSteamOpen = useWindowStore((state) => state.windows["steam"].isOpen);

  return (
    <>
      <div
        className={`fixed z-10000 inset-0 overflow-hidden bg-black`}
        style={{
          pointerEvents: "none",
          opacity: `${(1 - brightness) / 4}`,
        }}
      ></div>

      <NavBar />
      <HeroSection />
      <Dock />
      <ScreenApps />

      <Terminal />
      <Finder />
      <Safari />
      <Contact />
      <Youtube />
      <Text />
      <ImageWindow />

      {isDesktopSafe && (
        <>
          <Spotify />
          {isVSCodeOpen && <VSCode />}
          <Wordle />
          {isSteamOpen && <Steam />}
        </>
      )}
    </>
  );
};

export default Desktop;
