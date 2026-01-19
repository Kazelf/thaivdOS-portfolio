"use client";
import React from "react";
import clsx from "clsx";
import { Wifi, Bluetooth, Radio, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import MenuWrapper from "@/app/hoc/MenuWrapper";
import { useSystemStore } from "@/app/store";

const SettingsMenu = () => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const toggleDark = () => {
    setTheme(dark ? "light" : "dark");
  };

  const {
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    airdrop,
    toggleAirDrop,
  } = useSystemStore();

  const renderBoxBtn = (name, description, isItem, toggleItem, Icon) => (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          "rounded-full p-2",
          isItem
            ? "bg-primary text-primary-foreground"
            : "bg-base-300 text-base-foreground",
        )}
        onClick={toggleItem}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-medium text-sm">{name}</div>
        {description ? (
          <div className="text-xs text-base-foreground/70">
            {isItem ? description : "Off"}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full">
        <div className="col-span-2 row-span-2 cc-box">
          {renderBoxBtn("Wi-Fi", "Home Wifi", wifi, toggleWifi, Wifi)}
          {renderBoxBtn(
            "Bluetooth",
            "On",
            bluetooth,
            toggleBluetooth,
            Bluetooth,
          )}
          {renderBoxBtn(
            "Air Drop",
            "Contacts Only",
            airdrop,
            toggleAirDrop,
            Radio,
          )}
        </div>

        <div className="col-span-2 row-span-1 cc-box">
          {renderBoxBtn(
            dark ? "Dark Mode" : "Light Mode",
            null,
            dark,
            toggleDark,
            dark ? Moon : Sun,
          )}
        </div>
      </div>
    </>
  );
};

const SettingsMenuWrapped = MenuWrapper(SettingsMenu, "settings");

export default SettingsMenuWrapped;
