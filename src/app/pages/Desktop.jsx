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
} from "../windows";

const Desktop = () => {
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
    </>
  );
};

export default Desktop;
