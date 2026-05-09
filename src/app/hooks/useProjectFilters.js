"use client";
import { useMemo, useState } from "react";

const FILTER_ALL = "All";

const useProjectFilters = (projects, defaultFilter = FILTER_ALL) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const filters = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)));
    return [FILTER_ALL, ...unique];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => activeFilter === FILTER_ALL || project.category === activeFilter,
      ),
    [activeFilter, projects],
  );

  return { activeFilter, setActiveFilter, filters, filteredProjects };
};

export default useProjectFilters;
