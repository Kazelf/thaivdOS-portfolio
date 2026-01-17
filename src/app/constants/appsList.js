import { locations } from "./fileContent";

const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    kind: "app",
    icon: "finder.svg",
  },
  {
    id: "safari",
    name: "Experiences",
    kind: "app",
    icon: "safari.svg",
  },
  // {
  //   id: "photos",
  //   name: "Gallery",
  //   kind: "app",
  //   icon: "photos.svg",
  // },
  {
    id: "contact",
    name: "Contact",
    kind: "app",
    icon: "contact.svg",
  },
  {
    id: "terminal",
    name: "Skills",
    kind: "app",
    icon: "terminal.svg",
  },
  {
    id: "spotify",
    name: "Spotify",
    kind: "app",
    icon: "spotify.svg",
  },
  // {
  //   id: "trash",
  //   name: "Archives",
  //   kind: "app",
  //   icon: "trash.svg",
  // },
];

const screenApps = [
  {
    id: "finder",
    name: "Portfolio",
    kind: "app",
    icon: "/icons/apps/finder.svg",
  },
  locations.about.children[0],
  {
    id: "safari",
    name: "Experiences",
    kind: "app",
    icon: "/icons/apps/safari.svg",
  },
  {
    id: "terminal",
    name: "Skills",
    kind: "app",
    icon: "/icons/apps/terminal.svg",
  },
  {
    id: "contact",
    name: "Contact",
    kind: "app",
    icon: "/icons/apps/contact.svg",
  },
];

export { dockApps, screenApps };
