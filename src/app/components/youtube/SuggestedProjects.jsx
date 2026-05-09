"use client";
import React from "react";
import ProjectListItem from "./ProjectListItem";

const SuggestedProjects = ({ projects, onSelect }) => {
  return (
    <aside className="p-3">
      <h4 className="mb-3 text-sm font-semibold text-base-foreground">
        Suggested
      </h4>
      <div className="space-y-2">
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            onSelect={onSelect}
            variant="compact"
          />
        ))}
      </div>
    </aside>
  );
};

export default React.memo(SuggestedProjects);
