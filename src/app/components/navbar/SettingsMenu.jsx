"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Wifi, Bluetooth, Radio, Sun, Moon, Play, Pause } from "lucide-react";
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
              : "bg-base-300 text-base-foreground",
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

  const airdrop = useSystemStore((s) => s.airdrop);
  const toggleAirDrop = useSystemStore((s) => s.toggleAirDrop);

  const audioPlaying = useSystemStore((s) => s.audioPlaying);
  const setAudioPlaying = useSystemStore((s) => s.toggleAirDrop);

  const activeSong = useLocationStore((s) => s.activeSong);
  const { openWindow } = useWindowStore();

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
          name="Air Drop"
          description="Contacts Only"
          active={airdrop}
          onToggle={toggleAirDrop}
          Icon={Radio}
        />
      </div>

      <div className="col-span-2 row-span-1 cc-box">
        <ControlButton
          name={dark ? "Dark Mode" : "Light Mode"}
          active={dark}
          onToggle={toggleDark}
          Icon={dark ? Moon : Sun}
        />
      </div>

      <div className="col-span-2 row-span-1 cc-box">
        <ControlButton
          name={dark ? "Exit Full Screen" : "Enter Full Screen"}
          active={dark}
          onToggle={toggleDark}
          Icon={dark ? Moon : Sun}
        />
      </div>

      <div className="col-span-4 cc-box flex-col justify-center">
        <p className="font-medium text-sm">Display</p>
      </div>

      <div className="col-span-4 cc-box flex-col justify-center">
        <p className="font-medium text-sm">Sound</p>
      </div>

      <div className="col-span-4 cc-box flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={activeSong.image}
            alt={activeSong.name}
            height={50}
            width={50}
            className="rounded-md"
          />

          <div>
            <div className="font-medium text-sm">{activeSong.name}</div>

            <div className="text-xs text-base-foreground/70">
              {activeSong.author}
            </div>
          </div>
        </div>

        <button
          aria-label="Play"
          onClick={() => openWindow("spotify")}
          className="mr-2"
        >
          {audioPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
};

const SettingsMenuWrapped = MenuWrapper(SettingsMenu, "settings");

export default SettingsMenuWrapped;
