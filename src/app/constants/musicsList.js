const FAVOURITES_CATEGORY = {
  id: 1,
  name: "Favourites",
  image: "/icons/spotify/favourites.svg",
  children: [
    {
      id: 1,
      name: "Good Night Lofi",
      author: "FASSounds",
      image: "/images/spotify/good-night-lofi.webp",
      music: "/musics/good-night-lofi.mp3",
    },
    {
      id: 2,
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
  image: "/icons/spotify/vietnamese.png",
  children: [
    {
      id: 10,
      name: "Vietnam Bamboo Flute",
      author: "VPRODMUSIC_Asia_BGM",
      image: "/images/spotify/vietnam-bamboo-flute.webp",
      music: "/musics/vietnam-bamboo-flute.mp3",
    },
    {
      id: 11,
      name: "Cao Khánh Duy",
      author: "u_dszybcoxaj",
      image: "/images/spotify/cao-khanh-duy.webp",
      music: "/musics/cao-khanh-duy.mp3",
    },
  ],
};

const PIXEL_CATEGORY = {
  id: 3,
  name: "Pixel",
  image: "/icons/spotify/pixel.svg",
  children: [
    {
      id: 20,
      name: "Pixel Dreams",
      author: "Djlofi",
      image: "/images/spotify/pixel-dreams.jpg",
      music: "/musics/pixel-dreams.mp3",
    },
    {
      id: 21,
      name: "Pixel Melody",
      author: "yoshiyuki_tatsuya",
      image: "/images/spotify/pixel-melody.webp",
      music: "/musics/pixel-melody.mp3",
    },
  ],
};

const categories = {
  favourites: FAVOURITES_CATEGORY,
  vietnamese: VIETNAMESE_CATEGORY,
  pixel: PIXEL_CATEGORY,
};

const ALL_CATEGORY = {
  id: 0,
  name: "All",
  image: "/icons/spotify/all.svg",
  children: Object.values(categories).flatMap((category) =>
    category.children.map((song) => ({
      ...song,
      categoryId: category.id,
      categoryName: category.name,
    })),
  ),
};

export const musics = {
  all: ALL_CATEGORY,
  ...categories,
};
