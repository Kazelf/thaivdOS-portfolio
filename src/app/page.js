import { NavBar, HeroSection, Dock, HomeScreen } from "./components/";
import {
  Terminal,
  Resume,
  Finder,
  Contact,
  Text,
  ImageWindow,
  Safari,
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
      <Safari />
      <Contact />
      <Text />
      <ImageWindow />
    </main>
  );
}
