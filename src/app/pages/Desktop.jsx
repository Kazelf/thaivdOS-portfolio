import React from "react";
import { NavBar, HeroSection, Dock, HomeScreen } from "../components";
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

const Desktop = () => {
  const { isDesktopSafe } = useIsDesktop();

  return (
    <>
      <NavBar />
      <HeroSection />
      <Dock />
      <HomeScreen />

      <Terminal />
      <Resume />
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
