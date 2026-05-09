"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { Bell, Search, TvMinimalPlay } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapClient";
import { locations } from "../constants";
import useWindowStore from "../store/window";
import useSystemStore from "../store/system";
import ProjectDetailView from "../components/youtube/ProjectDetailView";

const projects = locations?.work?.children ?? [];

const getProjectDescription = (project) => {
  const txtFile = project.children?.find((child) => child.fileType === "txt");
  const raw = txtFile?.description;
  if (!raw) return "";
  return Array.isArray(raw) ? raw.join(" ") : raw;
};

const getProjectImages = (project) =>
  project.children
    ?.filter((child) => child.fileType === "img" && child.image)
    .map((child) => child.image) ?? [];

const FILTER_ALL = "All";

const FilterTabs = ({ filters, activeFilter, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {filters.map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <button
            type="button"
            key={filter}
            onClick={() => onChange(filter)}
            className={`w-full rounded-lg border-l-2 px-4 py-2 text-left text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "border-l-red-500 bg-base-300 text-base-foreground"
                : "border-l-transparent bg-base text-base-foreground hover:bg-base-300"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project, isFullscreen, onClick }) => {
  const image = project.images[0] || "/images/wallpaper.png";

  return (
    <article
      onClick={() => onClick(project.id)}
      className="group h-full cursor-pointer border border-transparent p-2 transition-all duration-300 hover:bg-base-200 hover:border-base-foreground hover:shadow-[0_0_22px_rgba(10,132,255,0.2)]"
    >
      <div className="relative mb-3 border border-base-300 overflow-hidden ">
        <img
          src={image}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isFullscreen ? "h-50" : "h-34"}`}
        />

        <span className="absolute bottom-2 right-2 rounded-full border border-base-300/80 bg-base/90 px-2.5 py-1 text-xs font-semibold text-base-foreground">
          {project.itemsCount} items
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Image
          className="rounded-full p-1 object-cover"
          src={"/images/vudinhthai.png"}
          height={30}
          width={40}
          alt="Me.png"
        />

        <div>
          <h5 className="line-clamp-1 text-sm font-semibold leading-snug text-base-foreground">
            {project.title}
          </h5>
          <p className="line-clamp-1 text-xs text-base-foreground/70">
            {project.role} • {project.category}
          </p>
        </div>
      </div>
    </article>
  );
};

const Youtube = () => {
  const isFullscreen = useWindowStore(
    (state) => state.windows.youtube?.isFullscreen,
  );

  const wifi = useSystemStore((state) => state.wifi);
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentProjectImageIndex, setCurrentProjectImageIndex] = useState(0);
  const [projectViewMode, setProjectViewMode] = useState("list");
  const [savedScrollTop, setSavedScrollTop] = useState(0);
  const listRef = useRef(null);
  const viewRef = useRef(null);

  const normalizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.name,
        brief: getProjectDescription(project),
        description: getProjectDescription(project),
        thumbnail: getProjectImages(project)[0] || "/images/wallpaper.png",
        type: project.kind === "folder" ? "Project" : project.kind,
        author: "Vudinhthai",
        avatar: "/images/vudinhthai.png",
        tags: project.techStack || [],
        links:
          project.children
            ?.filter((child) => child.fileType === "url" && child.url)
            .map((child) => child.url) || [],
        year: null,
        category: project.category || "Other",
        role: project.role || "Developer",
        images: getProjectImages(project),
        itemsCount: project.children?.length ?? 0,
      })),
    [],
  );

  const filters = useMemo(() => {
    const unique = Array.from(
      new Set(normalizedProjects.map((project) => project.category)),
    );
    return [FILTER_ALL, ...unique];
  }, [normalizedProjects]);

  const filteredProjects = useMemo(() => {
    return normalizedProjects.filter((project) => {
      const matchCategory =
        activeFilter === FILTER_ALL || project.category === activeFilter;
      const matchSearch = project.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeFilter, normalizedProjects, searchTerm]);

  const selectedProject = useMemo(
    () =>
      normalizedProjects.find((project) => project.id === selectedProjectId) ||
      null,
    [normalizedProjects, selectedProjectId],
  );

  const suggestedProjects = useMemo(
    () =>
      normalizedProjects.filter((project) => project.id !== selectedProjectId),
    [normalizedProjects, selectedProjectId],
  );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const openDetail = (projectId) => {
    const currentScroll = listRef.current?.scrollTop || 0;
    setSavedScrollTop(currentScroll);
    setSelectedProjectId(projectId);
    setCurrentProjectImageIndex(0);
    setProjectViewMode("detail");
  };

  const handleBack = () => {
    setProjectViewMode("list");
    window.requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = savedScrollTop;
    });
  };

  const selectSuggestedProject = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentProjectImageIndex(0);
  };

  useGSAP(
    () => {
      if (!viewRef.current) return;
      gsap.fromTo(
        viewRef.current,
        { opacity: 0.35, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [projectViewMode, selectedProjectId] },
  );

  return (
    <div className="window-content flex flex-col bg-base overflow-y-hidden! p-0! h-full min-h-0">
      <header className="p-2 flex shrink-0 items-center justify-between border-b border-b-base-300 bg-base-200">
        <div className="flex-center gap-2">
          <TvMinimalPlay className="h-10 text-red-500" />
          <h2 className="text-lg font-semibold tracking-wide text-base-foreground">
            MyProjects
          </h2>
        </div>

        <input
          type="search"
          placeholder="Search projects..."
          className="max-lg:hidden w-full max-w-xs rounded-full border border-base-300 text-sm bg-base p-2"
          aria-label="Search for projects"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="flex-center">
          <Bell className="icon" />
          <Image
            className="rounded-full p-1 object-cover"
            src={"/images/vudinhthai.png"}
            height={30}
            width={40}
            alt="Me.png"
          />
        </div>
      </header>

      <section className="flex p-4 min-h-0 flex-1">
        <aside className="max-sm:hidden w-40 shrink-0 rounded-xl border border-base-300 bg-base-200 p-3">
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onChange={handleFilterChange}
          />
        </aside>

        <div ref={viewRef} className="pl-4 pb-4 min-h-0 flex-1 overflow-hidden">
          {wifi && projectViewMode === "detail" && selectedProject ? (
            <ProjectDetailView
              project={selectedProject}
              projects={suggestedProjects}
              isFullscreen={Boolean(isFullscreen)}
              currentImageIndex={currentProjectImageIndex}
              onImageChange={setCurrentProjectImageIndex}
              onBack={handleBack}
              onSelectProject={selectSuggestedProject}
            />
          ) : wifi ? (
            <div ref={listRef} className="h-full overflow-y-auto">
              <div className="mb-3 hidden max-lg:flex items-center gap-2 rounded-full border border-base-300 bg-base px-3 py-2 text-sm text-base-foreground/70">
                <Search className="h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full bg-transparent outline-none"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div
                className={`max-sm:grid-cols-1 grid ${
                  isFullscreen ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isFullscreen={isFullscreen}
                    onClick={openDetail}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full col-center gap-3">
              <p className="text-center text-2xl font-bold text-base-foreground/70">
                You have no internet
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const YoutubeWindow = WindowWrapper(Youtube, "youtube", {
  title: "My Projects",
  windowClassName: "window w-3xl",
});

export default YoutubeWindow;
