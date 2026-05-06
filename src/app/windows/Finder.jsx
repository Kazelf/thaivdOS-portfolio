import React from "react";
import Image from "next/image";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import { Breadcrumb } from "../components";
import { Search } from "lucide-react";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import useFolderStore from "../store/folder";
import { useIsDesktop } from "../hooks";

// Header slot: chỉ có icon Search (Finder không có title text)
const FinderHeaderSlot = () => <Search className="icon" />;

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { currentFolder, openFolder } = useFolderStore();
  const { isDesktopSafe } = useIsDesktop();

  const contentApps = isDesktopSafe
    ? activeLocation?.children
    : currentFolder?.children;

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") {
      openFolder(item);
      return setActiveLocation(item);
    }
    if (["fig", "url"].includes(item.fileType) && item.url)
      return window.open(item.url, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <Image src={item.icon} alt={item.name} width={16} height={16} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-1 bg-base-200">
      <div className="side-bar max-lg:hidden col-span-1 p-3 bg-base border-r border-r-base-300">
        {renderList("Favourites", Object.values(locations))}
        {renderList("My Projects", locations.work.children)}
      </div>

      <div className="content p-4 col-span-3">
        {!isDesktopSafe ? <Breadcrumb /> : null}

        <ul className="flex flex-wrap gap-4">
          {contentApps?.map((item) => (
            <li
              key={item.id}
              className="app-icon"
              onClick={() => openItem(item)}
            >
              <Image src={item.icon} alt={item.name} width={60} height={60} />
              <p className="text-center">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder", {
  windowClassName: "window w-3xl",
  HeaderSlot: FinderHeaderSlot,
});

export default FinderWindow;
