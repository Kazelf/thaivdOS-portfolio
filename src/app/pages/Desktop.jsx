import React from "react";
import { NavBar, HeroSection, Dock, ScreenApps } from "../components";
import {
  Terminal,
  Resume,
  Finder,
  Contact,
  Text,
  ImageWindow,
  Safari,
  Spotify,
} from "../windows";
import { useIsDesktop } from "../hooks";
import { useSystemStore } from "../store";

const Desktop = () => {
  const { isDesktopSafe } = useIsDesktop();
  const { brightness } = useSystemStore();

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
      <Text />
      <ImageWindow />

      {isDesktopSafe && (
        <>
          <Spotify />
        </>
      )}
    </>
  );
};

export default Desktop;
