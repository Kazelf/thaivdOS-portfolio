const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/finder/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "Soul Sync Website",
      icon: "/icons/finder/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "SoulSync.txt",
          icon: "/icons/finder/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "Explore the world of smart dating with an accurate matching system that helps you find your perfect half based on zodiac signs, numerology, location, and interests. Connect effortlessly, chat instantly, and keep all your personal information completely secure.",
          ],
        },
        {
          id: 2,
          name: "soulsync.com",
          icon: "/icons/apps/safari.svg",
          kind: "file",
          fileType: "url",
          url: "https://soulsync-fe.pages.dev/",
        },
        {
          id: 3,
          name: "SoulSync.png",
          icon: "/icons/finder/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/projects/SoulSync.png",
        },
        {
          id: 4,
          name: "Source.github",
          icon: "/icons/finder/html.svg",
          kind: "file",
          fileType: "url",
          url: "https://github.com/nobitandoraemon/SoulSync-be",
        },
      ],
    },
    {
      id: 6,
      name: "JS Codefest 2025 SDK",
      icon: "/icons/finder/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Codefest.txt",
          icon: "/icons/finder/txt.svg",
          kind: "file",
          fileType: "txt",
          description: [
            "CodeFest is an academic event organized by JS Club, a coding competition where participants must program bots using specific commands to battle opponents, collect items, and overcome challenges, crafting unique strategies to win.",
            "CodeFest 2025 - SDK (Software Development Kit) is a toolkit designed to support contestants participating in CodeFest 2025.",
          ],
        },
        {
          id: 2,
          name: "landingpage.com",
          icon: "/icons/apps/safari.svg",
          kind: "file",
          fileType: "url",
          url: "https://codefest2025.jsclub.dev/",
        },
        {
          id: 3,
          name: "logo.png",
          icon: "/icons/finder/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/projects/codefest2025.png",
        },
      ],
    },
    {
      id: 7,
      name: "thaivdOS Portfolio",
      icon: "/icons/finder/folder.svg",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "Portfolio.txt",
          icon: "/icons/finder/txt.svg",
          kind: "file",
          fileType: "txt",
          subtitle: "thaivdOS Portfolio",
          description: [
            "A single-page personal website inspired by the macOS GUI and Javascript Mastery youtube channel, designed to deliver an interactive and visually engaging user interface.",
            "The project is built with Next.js 16, Tailwind CSS, while application state and window management are managed with Zustand and Immer. Animations are implemented using GSAP.",
          ],
        },
        {
          id: 2,
          name: "Portfolio.png",
          icon: "/icons/finder/png.svg",
          kind: "file",
          fileType: "img",
          image: "/images/projects/codefest2025.png",
        },
        {
          id: 3,
          name: "Source.github",
          icon: "/icons/finder/html.svg",
          kind: "file",
          fileType: "url",
          url: "https://github.com/Kazelf/thaivdOS-portfolio",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/finder/about.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "about-me.txt",
      icon: "/icons/finder/txt.svg",
      kind: "file",
      fileType: "txt",
      image: "/images/vudinhthai.png",
      subtitle: "Hey, that's Thai!",
      description: [
        "📍Hanoi, Vietnam",
        "I am a student at FPT University with a 100% scholarship.",
        "Currently, I am focusing on becoming a <b>Backend Developer</b>, with my main technologies being <b>Node.js, Express.js</b>, and database tools such as <b>SQL Server, MongoDB</b>. In addition, I have worked on some projects using <b>React.js, Next.js,</b> and <b>Tailwind CSS.</b>",
        "My Email: vudinhthai081106@gmail.com",
        'Linkedin: <a href="https://www.linkedin.com/in/thaivd0811/" target="_blank"> https://www.linkedin.com/in/thaivd0811/ </a>',
      ],
    },
    {
      id: 2,
      name: "me.png",
      icon: "/icons/finder/png.svg",
      kind: "file",
      fileType: "img",
      image: "/images/thai.png",
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/finder/resume.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "resume.pdf",
      icon: "/icons/finder/pdf.svg",
      kind: "file",
      fileType: "url",
      url: "/files/resume.pdf",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
};
