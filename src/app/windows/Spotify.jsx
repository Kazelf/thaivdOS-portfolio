"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { useLocationStore } from "../store";
import { musics } from "../constants";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const Spotify = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { musicCategory, setMusicCategory, activeSong, setActiveSong } =
    useLocationStore();

  const handlePlayButton = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  //handle auto play song
  useEffect(() => {
    if (!audioRef.current || activeSong.id === 0) return;

    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  }, [activeSong]);

  const renderList = (items, activeItem, setActiveItem) => (
    <>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveItem(item)}
            className={clsx(
              item.id === activeItem.id ? "active" : "not-active",
            )}
          >
            <Image src={item.image} alt={item.name} width={16} height={16} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="window w-3xl h-[70vh]">
      <div className="window-header">
        <WindowControls target="spotify" />
        <h2 className="w-full">Spotify</h2>
      </div>

      <div className="p-0 space-y-5 grid grid-cols-12 h-full">
        <div className="side-bar h-full max-lg:hidden col-span-3 p-3 bg-base border-r border-r-base-300">
          <h3>Categories</h3>
          {renderList(Object.values(musics), musicCategory, setMusicCategory)}
        </div>

        <div className="side-bar col-span-5 p-3">
          {renderList(musicCategory?.children, activeSong, setActiveSong)}
        </div>

        <div className="col-span-4 flex-center flex-col bg-secondary/50 text-secondary-foreground m-4 p-6 rounded-2xl">
          {activeSong.id !== 0 ? (
            <>
              <img
                src={activeSong.image}
                className="w-full rounded-full shadow-lg mb-3 p-2"
              />
              <h3 className="font-semibold">{activeSong.name}</h3>
              <p className="text-sm">{activeSong.author}</p>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step={0.1}
                onChange={(e) => {
                  const time = Number(e.target.value);
                  audioRef.current.play();
                  setIsPlaying(true);
                  audioRef.current.currentTime = time;
                  setCurrentTime(time);
                }}
                className="w-full my-5 h-1 accent-secondary  cursor-pointer"
              />

              <div className="flex justify-around w-full">
                <button aria-label="Prev" onClick={() => {}}>
                  <SkipBack />
                </button>

                <button
                  aria-label="Play"
                  onClick={handlePlayButton}
                  className="hover:scale-105 transition"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>

                <button aria-label="Next" onClick={() => {}}>
                  <SkipForward />
                </button>
              </div>

              <audio
                ref={audioRef}
                src={activeSong.music}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onTimeUpdate={() =>
                  setCurrentTime(audioRef.current.currentTime)
                }
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const SpotifyWindow = WindowWrapper(Spotify, "spotify");

export default SpotifyWindow;
