"use client";
import React from "react";

const SuggestedProjects = ({ projects, activeId, onSelect }) => {
  return (
    <aside className="rounded-2xl border border-base-300 bg-base-200/50 p-3">
      <h4 className="mb-3 text-sm font-semibold text-base-foreground/80">
        Suggested
      </h4>
      <div className="space-y-2">
        {projects.map((project) => {
          const isActive = project.id === activeId;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              className={`flex gap-2 w-full rounded-xl border p-2 text-left transition ${
                isActive
                  ? "border-primary/60 bg-base"
                  : "border-base-300 bg-base/60 hover:border-base-foreground/40"
              }`}
            >
              <img
                src={project.thumbnail || "/images/wallpaper.png"}
                alt={project.title}
                className="h-full w-30 rounded-lg border border-base-300 object-cover"
              />
              <div>
                <p className="mt-2 line-clamp-1 text-sm font-semibold text-base-foreground">
                  {project.title}
                </p>
                <p className="line-clamp-1 text-xs text-base-foreground/70">
                  {project.author} • {project.category}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default React.memo(SuggestedProjects);
