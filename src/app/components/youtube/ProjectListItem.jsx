"use client";
import React from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/images/wallpaper.png";

const ProjectMeta = ({ project, titleClassName = "", subtitleClassName = "" }) => (
  <div>
    <p
      className={`line-clamp-1 text-sm font-semibold text-base-foreground ${titleClassName}`}
    >
      {project.title}
    </p>
    <p className={`line-clamp-1 text-xs text-base-foreground/70 ${subtitleClassName}`}>
      {project.role} • {project.category}
    </p>
  </div>
);

const ProjectListItem = ({
  project,
  onSelect,
  variant = "grid",
  isFullscreen = false,
}) => {
  const thumbnail = project.images?.[0] || FALLBACK_IMAGE;

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        className="flex w-full gap-2 rounded-xl border border-transparent bg-base/60 p-2 text-left hover:border-base-foreground/40"
      >
        <img
          src={thumbnail}
          alt={project.title}
          className="h-20 w-30 rounded-lg border border-base-300 object-cover"
        />
        <ProjectMeta project={project} titleClassName="mt-2" />
      </button>
    );
  }

  return (
    <article
      onClick={() => onSelect(project.id)}
      className="group h-full cursor-pointer border border-transparent p-2 transition-all duration-300 hover:border-base-foreground hover:bg-base-200 hover:shadow-[0_0_20px_rgba(255,0,0,0.12)]"
    >
      <div className="mb-3 overflow-hidden border border-base-300">
        <img
          src={thumbnail}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isFullscreen ? "h-50" : "h-34"}`}
        />
      </div>

      <div className="flex items-center gap-2">
        <Image
          className="rounded-full p-1 object-cover"
          src="/images/vudinhthai.png"
          height={30}
          width={40}
          alt="Me.png"
        />
        <ProjectMeta project={project} />
      </div>
    </article>
  );
};

export default React.memo(ProjectListItem);
