"use client";
import React, { useMemo, useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useWindowStore from "../store/window";

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

const getProjectType = (project) => {
  if (project.type) return project.type;
  const hasUrl = project.children?.some((child) => child.fileType === "url");
  return hasUrl ? "Web" : "Project";
};

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

const ProjectCard = ({ project }) => {
  const image = project.images[0] || "/images/wallpaper.png";

  return (
    <article className="group h-full rounded-2xl p-2 transition-all duration-300 hover:bg-base-200 hover:shadow-[0_0_30px_rgba(255,0,0,0.12)]">
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={project.title}
          className="h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded-full border border-base-300/80 bg-base/90 px-2.5 py-1 text-xs font-semibold text-base-foreground">
          {project.itemsCount} items
        </span>
      </div>

      <h3 className="line-clamp-1 text-lg font-bold leading-snug text-base-foreground">
        {project.title}
      </h3>

      <p className="mt-1 line-clamp-1 text-sm text-base-foreground/70">
        {project.category} • {project.type}
      </p>
    </article>
  );
};

const Youtube = () => {
  const isFullscreen = useWindowStore(
    (state) => state.windows.youtube?.isFullscreen,
  );
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

  const normalizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.name,
        category: project.category || "Other",
        type: getProjectType(project),
        images: getProjectImages(project),
        description: getProjectDescription(project),
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
      return matchCategory;
    });
  }, [activeFilter, normalizedProjects]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="window-content flex flex-col bg-base overflow-y-hidden! p-0! h-full min-h-0">
      <header className="p-2 flex shrink-0 items-center justify-between border-b border-b-base-300 bg-base-200">
        <div className="flex items-center gap-3">
          <span className="h-6 w-2 rounded-full bg-red-500" />
          <h2 className="text-sm font-bold tracking-wide text-base-foreground">
            MyProjects
          </h2>
        </div>

        <input
          type="search"
          placeholder="Search projects..."
          className="w-full max-w-xs rounded-full border border-base-300 bg-base px-4 py-2 text-sm text-base-foreground/50 outline-none"
          aria-label="Search for projects"
        />
      </header>

      <section className="flex p-4 min-h-0 flex-1">
        <aside className="w-40 shrink-0 rounded-xl border border-base-300 bg-base-200 p-3">
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onChange={handleFilterChange}
          />
        </aside>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div
            className={`grid pl-4 pb-4 gap-6 transition-all duration-300 ${
              isFullscreen ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
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
