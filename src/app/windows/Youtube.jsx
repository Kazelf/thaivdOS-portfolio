"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { Bell, TvMinimalPlay } from "lucide-react";
import { locations } from "../constants";
import useWindowStore from "../store/window";
import useSystemStore from "../store/system";
import { ProjectDetailView, ProjectListItem, TabsList } from "../components";
import { useProjectFilters } from "../hooks";

const projects = locations?.work?.children ?? [];

const getProjectDescription = (project) => {
  const txtFile = project.children?.find((child) => child.fileType === "txt");
  const raw = txtFile?.description;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
};

const Youtube = () => {
  const isFullscreen = useWindowStore(
    (state) => state.windows.youtube?.isFullscreen,
  );

  const wifi = useSystemStore((state) => state.wifi);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [savedScrollTop, setSavedScrollTop] = useState(0);
  const listRef = useRef(null);

  const normalizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.name,
        descriptionBlocks: getProjectDescription(project),
        tags: project.techStack || [],
        links:
          project.children
            ?.filter((child) => child.fileType === "url" && child.url)
            .map((child) => child.url) || [],
        category: project.category || "Other",
        role: project.role || "Developer",
        images:
          project.children
            ?.filter((child) => child.fileType === "img" && child.image)
            .map((child) => child.image) ?? [],
      })),
    [],
  );

  const { activeFilter, setActiveFilter, filters, filteredProjects } =
    useProjectFilters(normalizedProjects);

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

  const openDetail = (projectId) => {
    const currentScroll = listRef.current?.scrollTop || 0;
    setSavedScrollTop(currentScroll);
    setSelectedProjectId(projectId);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    window.requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = savedScrollTop;
    });
  };

  return (
    <div className="window-content flex flex-col bg-base overflow-y-hidden! p-0! h-full min-h-0">
      <header className="p-2 flex shrink-0 items-center justify-between border-b border-b-base-300 bg-base-200">
        <div onClick={handleBack} className="cursor-pointer flex-center gap-2">
          <TvMinimalPlay className="h-10 text-red-500" />
          <h2 className="select-none text-lg font-semibold text-base-foreground">
            MyProjects
          </h2>
        </div>

        <input
          type="search"
          placeholder="Search projects..."
          className="max-lg:hidden w-full max-w-xs rounded-full border border-base-300 text-sm bg-base p-2"
          aria-label="Search for projects"
          disabled
        />

        <div className="flex-center">
          <Bell className="icon" />
          <Image
            className="rounded-full p-1 object-cover"
            src={"/images/vudinhthai.png"}
            height={40}
            width={40}
            alt="Me.png"
          />
        </div>
      </header>

      <section className="flex p-4 min-h-0 flex-1">
        <aside className="max-sm:hidden w-40 shrink-0 rounded-xl border border-base-300 bg-base-200 p-3">
          <TabsList
            items={filters}
            activeId={activeFilter}
            onSelect={setActiveFilter}
            listClassName="flex flex-col gap-2"
            itemClassName="w-full rounded-lg border-l-2 px-4 py-2 text-left text-sm font-semibold"
            activeClassName="border-l-red-500 bg-base-300 text-base-foreground"
            inactiveClassName="border-l-transparent bg-base text-base-foreground hover:bg-base-300"
            renderItem={(filter) => <span>{filter}</span>}
          />
        </aside>

        <div className="pl-4 min-h-0 flex-1 overflow-hidden">
          {wifi && selectedProject ? (
            <ProjectDetailView
              project={selectedProject}
              projects={suggestedProjects}
              isFullscreen={isFullscreen}
              onBack={handleBack}
              onSelectProject={setSelectedProjectId}
            />
          ) : wifi ? (
            <div ref={listRef} className="h-full overflow-y-auto">
              <div
                className={`max-sm:grid-cols-1 grid ${
                  isFullscreen ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                {filteredProjects.map((project) => (
                  <ProjectListItem
                    key={project.id}
                    project={project}
                    onSelect={openDetail}
                    variant="grid"
                    isFullscreen={isFullscreen}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-2xl font-bold text-base-foreground/70">
              You have no internet
            </p>
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
