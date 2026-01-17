import React from "react";
import Image from "next/image";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { useLocationStore } from "../store";
import { musics } from "../constants";

const Spotify = () => {
  const { musicCategory, setMusicCategory } = useLocationStore();
  const renderList = (items) => (
    <div>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setMusicCategory(item)}
            className={clsx(
              item.id === musicCategory.id ? "active" : "not-active",
            )}
          >
            <Image src={item.icon} alt={item.name} width={16} height={16} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="window w-3xl h-[70vh]">
      <div className="window-header">
        <WindowControls target="spotify" />
        <h2 className="w-full">Spotify</h2>
      </div>

      <div className="p-0 space-y-5 grid grid-cols-12 h-full">
        <div className="side-bar h-full max-lg:hidden col-span-3 p-3 bg-base border-r border-r-base-300">
          {renderList(Object.values(musics))}
        </div>
        <div className="side-bar col-span-5 p-3">
          {renderList(musicCategory?.children)}
        </div>
        <div className="col-span-4 bg-base-300 m-4 rounded-2xl">player</div>
      </div>
    </div>
  );
};

const SpotifyWindow = WindowWrapper(Spotify, "spotify");

export default SpotifyWindow;
