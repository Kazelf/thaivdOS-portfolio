const FAVOURITES_CATEGORY = {
  id: 1,
  name: "Favourites",
  image: "/icons/apps/spotify.svg",
  children: [
    {
      id: 1,
      name: "Nature",
      author: "NikitaKondrashev",
      image: "/images/spotify/nature.jpg",
      music: "/musics/nature.mp3",
    },
  ],
};

const VIETNAMESE_CATEGORY = {
  id: 2,
  name: "Vietnamese",
  image: "/icons/apps/spotify.svg",
  children: [
    {
      id: 2,
      name: "Vi sao khong phai a",
      author: "NikitaKondrashev",
      image: "/images/spotify/nature.jpg",
      music: "/musics/nature.mp3",
    },
  ],
};

const KPOP_CATEGORY = {
  id: 3,
  name: "K-POP",
  image: "/icons/apps/spotify.svg",
  children: [
    {
      id: 3,
      name: "golden",
      author: "NikitaKondrashev",
      image: "/images/spotify/nature.jpg",
      music: "/musics/nature.mp3",
    },
    {
      id: 4,
      name: "ditto",
      author: "NikitaKondrashev",
      image: "/images/spotify/nature.jpg",
      music: "/musics/nature.mp3",
    },
  ],
};

export const musics = {
  favourites: FAVOURITES_CATEGORY,
  vietnamese: VIETNAMESE_CATEGORY,
  kpop: KPOP_CATEGORY,
};
