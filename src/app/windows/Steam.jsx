"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ExternalLink, Play, Upload } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";
import { TabsList } from "../components";
import { games, gameSystems } from "../constants";

const ACCEPTED_EXTENSIONS = Object.values(gameSystems)
  .flatMap((s) => s.extensions)
  .join(",");

const detectSystem = (fileName) => {
  const lower = fileName.toLowerCase();
  return Object.keys(gameSystems).find((key) =>
    gameSystems[key].extensions.some((ext) => lower.endsWith(ext)),
  );
};

const buildPlayerUrl = (game) =>
  `/emulator/play.html?${new URLSearchParams({
    system: game.system,
    rom: game.rom,
    name: game.name,
  })}`;

const Steam = () => {
  const [library, setLibrary] = useState(games);
  const [selected, setSelected] = useState(games[0]);
  const [playing, setPlaying] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const blobUrlsRef = useRef([]);

  // Revoke uploaded ROM blobs when the window closes (component unmounts).
  useEffect(() => {
    const urls = blobUrlsRef.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const system = detectSystem(file.name);
    if (!system) {
      setError("Only .nes and .gba files are supported.");
      return;
    }

    const rom = URL.createObjectURL(file);
    blobUrlsRef.current.push(rom);

    const game = {
      id: `upload-${Date.now()}`,
      name: file.name.replace(/\.[^.]+$/, ""),
      system,
      developer: "Your file",
      genre: "Uploaded",
      rom,
      uploaded: true,
    };

    setError("");
    setLibrary((prev) => [...prev, game]);
    setSelected(game);
  };

  return (
    <div className="grid grid-cols-12 h-full min-h-0 bg-base-200 text-base-foreground">
      <div className="side-bar col-span-3 flex flex-col min-h-0 p-3 bg-base border-r border-r-base-300">
        <div className="mb-3 p-2 rounded-lg bg-base-300/40 border border-base-300 leading-relaxed">
          <p className="text-sm">
            <b>Arrow keys</b> · <b>Z / X</b> (A / B) · <b>Enter</b> (Start) ·{" "}
            <b>V</b> (Select) · <b>Q / E</b> (L / R).
          </p>
          <p className="mt-1 text-xs text-base-foreground/60">
            To remap: move the mouse down over the game to show the emulator
            menu bar, then open <b>Control Settings</b>.
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          {Object.entries(gameSystems).map(([key, system]) => {
            const items = library.filter((g) => g.system === key);
            if (!items.length) return null;

            return (
              <TabsList
                key={key}
                title={`${system.name} (${items.length})`}
                items={items}
                activeId={selected?.id}
                onSelect={(game) => {
                  setSelected(game);
                  setPlaying(null);
                }}
                itemClassName="h-10"
                renderItem={(game) => (
                  <>
                    {game.cover ? (
                      <img
                        src={game.cover}
                        alt={game.name}
                        loading="lazy"
                        className="h-full aspect-square object-cover rounded-sm"
                        style={{ imageRendering: "pixelated" }}
                      />
                    ) : (
                      <div className="h-full aspect-square flex-center rounded-sm bg-base-300 text-[10px] font-bold text-primary">
                        {key.toUpperCase()}
                      </div>
                    )}
                    <p className="text-sm font-medium truncate">{game.name}</p>
                  </>
                )}
              />
            );
          })}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-center gap-2 mt-3 px-3 py-2 text-sm rounded-lg bg-base-300 hover:bg-primary/25 hover:text-primary cursor-pointer"
        >
          <Upload className="size-4" />
          Add game from file
        </button>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      <div className="col-span-9 min-h-0 flex flex-col">
        {playing ? (
          <>
            <div className="flex items-center gap-2 px-3 py-2 bg-base border-b border-b-base-300">
              <button
                onClick={() => setPlaying(null)}
                className="p-1 rounded-md hover:bg-base-300 hover:text-primary cursor-pointer"
                aria-label="Back to library"
              >
                <ArrowLeft className="size-4" />
              </button>
              <p className="text-sm font-medium truncate">{playing.name}</p>
            </div>
            <iframe
              key={playing.id}
              src={buildPlayerUrl(playing)}
              title={playing.name}
              className="flex-1 w-full bg-black"
              allow="autoplay; fullscreen; gamepad"
              onLoad={(e) => e.currentTarget.focus()}
            />
          </>
        ) : (
          selected && (
            <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-5">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-base border border-base-300 flex-center">
                {selected.cover ? (
                  <img
                    src={selected.cover}
                    alt={selected.name}
                    className="h-full w-full object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <p className="text-4xl font-bold text-primary/60">
                    {gameSystems[selected.system].name}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p className="text-sm text-base-foreground/60">
                    {selected.developer} · {gameSystems[selected.system].name}{" "}
                    · {selected.genre}
                  </p>
                </div>
                <button
                  onClick={() => setPlaying(selected)}
                  className={clsx(
                    "flex-center gap-2 px-6 py-2 rounded-lg font-semibold cursor-pointer",
                    "steam-play",
                  )}
                >
                  <Play className="size-4" />
                  Play
                </button>
              </div>

              <div className="text-sm text-base-foreground/70 space-y-1">
                {selected.license && (
                  <p className="flex items-center gap-1">
                    Open-source · {selected.license} ·
                    <a
                      href={selected.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline"
                    >
                      Source <ExternalLink className="size-3" />
                    </a>
                  </p>
                )}
                {selected.uploaded && (
                  <p>Your ROM stays in this browser tab and is never uploaded.</p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const SteamWindow = WindowWrapper(Steam, "steam", {
  title: "Steam",
  windowClassName: "window steam-theme w-5xl h-[80vh]",
});

export default SteamWindow;
