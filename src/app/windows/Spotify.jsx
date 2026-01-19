"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { useLocationStore, useSystemStore } from "../store";
import { musics } from "../constants";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const Spotify = () => {
  const audioRef = useRef(null);
  const { audioPlaying, setAudioPlaying } = useSystemStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { musicCategory, setMusicCategory, activeSong, setActiveSong } =
    useLocationStore();

  //hanle play button
  const handlePlayButton = () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  //handle audio progress bar
  const handleProgressBar = (e) => {
    const time = Number(e.target.value);
    audioRef.current.play();
    setAudioPlaying(true);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  //handle auto play song when open
  useEffect(() => {
    if (!audioRef.current || (activeSong.id === 1 && !audioPlaying)) return;

    audioRef.current.load();
    audioRef.current.play();
    setAudioPlaying(true);
  }, [activeSong]);

  //handle prev/next song
  const allSongs = musics.all.children;
  const currentIndex = allSongs.findIndex((song) => song.id === activeSong.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allSongs.length;
    setActiveSong(allSongs[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
    setActiveSong(allSongs[prevIndex]);
  };

  const renderList = (items, activeItem, setActiveItem) => (
    <>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveItem(item)}
            className={clsx(
              "h-10",
              item.id === activeItem.id ? "active" : "not-active",
            )}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full rounded-sm"
            />
            <div>
              <p className="text-sm font-medium truncate">{item.name}</p>
              {item.author ? (
                <p className="text-xs truncate">{item.author}</p>
              ) : (
                <></>
              )}
            </div>
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

      <div className="p-0 space-y-5 grid grid-cols-12 h-full min-h-0">
        <div className="side-bar h-full max-lg:hidden col-span-3 p-3 bg-base border-r border-r-base-300">
          <h3>Categories</h3>
          {renderList(Object.values(musics), musicCategory, setMusicCategory)}
        </div>

        <div className="side-bar flex-1 min-h-0 overflow-y-auto col-span-5 p-3 no-scrollbar">
          <div className="flex">
            <Image
              src={musicCategory.image}
              alt={musicCategory.name}
              width={24}
              height={24}
            />
            <p className="ml-2 font-medium truncate">{musicCategory.name}</p>
          </div>
          <hr className="my-4 opacity-20" />
          <p className="mb-2 text-sm">{musicCategory.children.length} songs</p>
          {renderList(musicCategory?.children, activeSong, setActiveSong)}
        </div>

        <div className="col-span-4 flex-center flex-col bg-secondary/50 text-secondary-foreground m-4 p-6 rounded-2xl">
          {activeSong.id !== 0 ? (
            <>
              <img
                src={activeSong.image}
                alt={activeSong.name}
                className={clsx(
                  "w-full rounded-full shadow-lg mb-3 p-2",
                  audioPlaying ? "spin" : "spin-paused",
                )}
              />
              <h3 className="font-semibold text-shadow-2xs">
                {activeSong.name}
              </h3>
              <p className="text-sm text-shadow-2xs">{activeSong.author}</p>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step={0.1}
                onChange={handleProgressBar}
                className="w-full my-5 h-1 accent-secondary  cursor-pointer"
              />

              <div className="flex justify-around w-full">
                <button aria-label="Prev" onClick={handlePrev}>
                  <SkipBack />
                </button>

                <button
                  aria-label="Play"
                  onClick={handlePlayButton}
                  className="hover:scale-105 transition"
                >
                  {audioPlaying ? <Pause /> : <Play />}
                </button>

                <button aria-label="Next" onClick={handleNext}>
                  <SkipForward />
                </button>
              </div>

              <audio
                ref={audioRef}
                src={activeSong.music}
                onPlay={() => setAudioPlaying(true)}
                onPause={() => setAudioPlaying(false)}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onTimeUpdate={() =>
                  setCurrentTime(audioRef.current.currentTime)
                }
                loop
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
