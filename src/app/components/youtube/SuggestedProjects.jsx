"use client";
import React from "react";

const SuggestedProjects = ({ projects, onSelect }) => {
  return (
    <aside className="p-3">
      <h4 className="mb-3 text-sm font-semibold text-base-foreground">
        Suggested
      </h4>
      <div className="space-y-2">
        {projects.map((project) => {
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
              className={`flex gap-2 w-full rounded-xl border border-transparent p-2 text-left bg-base/60 hover:border-base-foreground/40`}
            >
              <img
                src={project.images[0] || "/images/wallpaper.png"}
                alt={project.title}
                className="h-20 w-30 rounded-lg border border-base-300 object-cover"
              />
              <div>
                <p className="mt-2 line-clamp-1 text-sm font-semibold text-base-foreground">
                  {project.title}
                </p>
                <p className="line-clamp-1 text-xs text-base-foreground/70">
                  {project.role} • {project.category}
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
