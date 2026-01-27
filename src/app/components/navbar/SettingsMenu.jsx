"use client";
import React from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useTheme } from "next-themes";
import clsx from "clsx";
import {
  Wifi,
  Bluetooth,
  Sun,
  SunDim,
  Moon,
  Play,
  SkipForward,
  SkipBack,
  Pause,
  VolumeX,
  Volume2,
} from "lucide-react";
import MenuWrapper from "@/app/hoc/MenuWrapper";
import { useSystemStore, useLocationStore, useWindowStore } from "@/app/store";

const ControlButton = React.memo(
  ({ name, description, active, onToggle, Icon }) => {
    return (
      <div className="flex items-center gap-2">
        <div
          className={clsx(
            "rounded-full p-2 cursor-pointer",
            active
              ? "bg-primary text-primary-foreground"
              : "bg-base-300 text-base-foreground/70",
          )}
          onClick={onToggle}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div>
          <div className="font-medium text-sm">{name}</div>
          {description && (
            <div className="text-xs text-base-foreground/70">
              {active ? description : "Off"}
            </div>
          )}
        </div>
      </div>
    );
  },
);

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const toggleDark = () => {
    setTheme(dark ? "light" : "dark");
  };

  const wifi = useSystemStore((s) => s.wifi);
  const toggleWifi = useSystemStore((s) => s.toggleWifi);

  const bluetooth = useSystemStore((s) => s.bluetooth);
  const toggleBluetooth = useSystemStore((s) => s.toggleBluetooth);

  const audioPlaying = useSystemStore((s) => s.audioPlaying);
  const toggleAudioPlaying = useSystemStore((s) => s.toggleAudioPlaying);

  const volume = useSystemStore((s) => s.volume);
  const setVolume = useSystemStore((s) => s.setVolume);

  const brightness = useSystemStore((s) => s.brightness);
  const setBrightness = useSystemStore((s) => s.setBrightness);

  const activeSong = useLocationStore((s) => s.activeSong);

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full">
      <div className="col-span-2 row-span-2 cc-box flex-col justify-center">
        <ControlButton
          name="Wi-Fi"
          description="Home Wifi"
          active={wifi}
          onToggle={toggleWifi}
          Icon={Wifi}
        />

        <ControlButton
          name="Bluetooth"
          description="On"
          active={bluetooth}
          onToggle={toggleBluetooth}
          Icon={Bluetooth}
        />

        <ControlButton
          name={dark ? "Dark Mode" : "Light Mode"}
          active={dark}
          onToggle={toggleDark}
          Icon={dark ? Moon : Sun}
        />
      </div>

      <div className="col-span-2 row-span-2 cc-box flex-col">
        <div className="flex flex-col items-center text-center">
          <Image
            src={activeSong.image}
            alt={activeSong.name}
            height={40}
            width={40}
            className="rounded-md mb-2"
          />

          <div className="font-medium text-sm truncate w-full">
            {activeSong.name}
          </div>
          <div className="text-xs text-base-foreground/70 truncate w-full">
            {activeSong.author}
          </div>
        </div>

        <div className="flex justify-around text-base-foreground/70">
          <SkipBack />

          <button aria-label="Play" onClick={toggleAudioPlaying} className="">
            {audioPlaying ? <Pause /> : <Play />}
          </button>

          <SkipForward />
        </div>
      </div>

      <div className="col-span-4 cc-box flex-col justify-center">
        <p className="font-medium text-sm">Display</p>
        <div className="flex gap-2 text-base-foreground/70">
          <SunDim />
          <input
            type="range"
            min={0}
            max={100}
            value={brightness * 100}
            onChange={(e) => setBrightness(e.target.value / 100)}
            data-tooltip-id="slider-tooltip"
            data-tooltip-content={`${Math.round(brightness * 100)}`}
            data-tooltip-delay-show={100}
            className="w-full accent-primary cursor-pointer"
          />
          <Sun />
        </div>
      </div>

      <div className="col-span-4 cc-box flex-col justify-center">
        <p className="font-medium text-sm">Sound</p>
        <div className="flex gap-2 text-base-foreground/70">
          <VolumeX />
          <input
            type="range"
            min={0}
            max={100}
            value={volume * 100}
            onChange={(e) => setVolume(e.target.value / 100)}
            data-tooltip-id="slider-tooltip"
            data-tooltip-content={`${Math.round(volume * 100)}`}
            data-tooltip-delay-show={100}
            className="w-full accent-primary cursor-pointer"
          />
          <Volume2 />
        </div>
      </div>

      <Tooltip
        id="slider-tooltip"
        place="top"
        offset={1}
        noArrow="true"
        className="bg-base-300/50! backdrop-blur-lg! p-2! py-1! text-base-foreground! shadow-2xl!"
      />
    </div>
  );
};

const SettingsMenuWrapped = MenuWrapper(SettingsMenu, "settings");

export default SettingsMenuWrapped;
