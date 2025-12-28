const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "Soul Sync Website",
      icon: "/images/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Soul Sync.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "Explore the world of smart dating with an accurate matching system that helps you find your perfect half based on zodiac signs, numerology, location, and interests. Connect effortlessly, chat instantly, and keep all your personal information completely secure.",
          ],
        },
        {
          id: 2,
          name: "soulsync.com",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          url: "https://soulsync-fe.pages.dev/",
        },
        {
          id: 3,
          name: "SoulSync.png",
          icon: "/images/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/SoulSync.png",
        },
        {
          id: 4,
          name: "Source.github",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          url: "https://github.com/nobitandoraemon/SoulSync-be",
        },
      ],
    },
    {
      id: 6,
      name: "JS Codefest 2025 SDK",
      icon: "/images/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Codefest.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "CodeFest is an academic event organized by JS Club, aiming to create a meaningful playground for programming enthusiasts across Northern Vietnam with 150+ participants. With the goal of connecting the young coder community, CodeFest 2025 is not only a place for contestants to showcase their skills and learn from one another, but also a vibrant and inspiring space — truly reflecting the spirit of a youth-focused technology festival.CodeFest 2025 - SDK (Software Development Kit) is a toolkit designed to support contestants participating in CodeFest 2025.",
          ],
        },
        {
          id: 2,
          name: "codefest2025.com",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          url: "https://codefest2025.jsclub.dev/",
        },
        {
          id: 3,
          name: "codefest2025.png",
          icon: "/images/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/codefest2025.png",
        },
      ],
    },
    {
      id: 7,
      name: "thaivdOS Portfolio",
      icon: "/images/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Portfolio.txt",
          icon: "/images/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "CodeFest is an academic event organized by JS Club, aiming to create a meaningful playground for programming enthusiasts across Northern Vietnam with 150+ participants. With the goal of connecting the young coder community, CodeFest 2025 is not only a place for contestants to showcase their skills and learn from one another, but also a vibrant and inspiring space — truly reflecting the spirit of a youth-focused technology festival.CodeFest 2025 - SDK (Software Development Kit) is a toolkit designed to support contestants participating in CodeFest 2025.",
          ],
        },
        {
          id: 2,
          name: "Source.com",
          icon: "/images/safari.svg",
          kind: "file",
          fileType: "url",
          url: "",
        },
        {
          id: 3,
          name: "Portfolio.png",
          icon: "/images/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/codefest2025.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/about.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "about-me.txt",
      icon: "/images/txt.svg",
      kind: "file",
      fileType: "txt",
      image: "/images/vudinhthai.png",
      subtitle: "Hey, that's me! Meet Vu Dinh Thai",
      description: ["lorem ipsum"],
    },
    {
      id: 2,
      name: "me.png",
      icon: "/images/png.svg",
      kind: "file",
      fileType: "img",
      image: "/images/vudinhthai.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
};
