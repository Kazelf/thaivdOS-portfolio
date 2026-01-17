const FAVOURITES_CATEGORY = {
  id: 1,
  name: "Favourites",
  icon: "/icons/apps/spotify.svg",
  children: [
    {
      id: 1,
      name: "Nature",
      author: "NikitaKondrashev",
      icon: "/images/spotify/nature.jpg",
    },
  ],
};

const VIETNAMESE_CATEGORY = {
  id: 2,
  name: "Vietnamese Songs",
  icon: "/icons/apps/spotify.svg",
  children: [
    {
      id: 1,
      name: "Nature",
      author: "NikitaKondrashev",
      icon: "/images/spotify/nature.jpg",
    },
  ],
};

const KPOP_CATEGORY = {
  id: 3,
  name: "K-POP",
  icon: "/icons/apps/spotify.svg",
  children: [
    {
      id: 1,
      name: "Nature",
      author: "NikitaKondrashev",
      icon: "/images/spotify/nature.jpg",
    },
  ],
};

export const musics = {
  favourites: FAVOURITES_CATEGORY,
  vietnamese: VIETNAMESE_CATEGORY,
  kpop: KPOP_CATEGORY,
};
