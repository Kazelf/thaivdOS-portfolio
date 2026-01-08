"use client";
import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import useSystemStore from "./store/system";

export default function Home() {
  const { login, setLogin } = useSystemStore();

  return (
    <main className="h-dvh w-dvw overflow-hidden">
      {login ? <Desktop /> : <Login setLogin={() => setLogin(true)} />}
    </main>
  );
}
