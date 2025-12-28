import { NavBar, HeroSection, Dock, HomeScreen } from "./components/";
import {
  Terminal,
  Resume,
  Finder,
  Contact,
  Text,
  ImageWindow,
} from "./windows";

export default function Home() {
  return (
    <main className="h-dvh w-dvw overflow-hidden">
      <NavBar />
      <HeroSection />
      <Dock />
      <HomeScreen />

      <Terminal />
      <Resume />
      <Finder />
      <Contact />
      <Text />
      <ImageWindow />
    </main>
  );
}
