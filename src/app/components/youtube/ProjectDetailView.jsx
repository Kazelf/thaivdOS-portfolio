"use client";
import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapClient";
import ProjectCarousel from "./ProjectCarousel";
import SuggestedProjects from "./SuggestedProjects";

const ProjectDetailView = ({
  project,
  projects,
  isFullscreen,
  currentImageIndex,
  onImageChange,
  onBack,
  onSelectProject,
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
      );
    },
    { dependencies: [project?.id] },
  );

  const pills = useMemo(() => {
    const data = [project?.category, ...(project?.tags || [])].filter(Boolean);
    return data.slice(0, 5);
  }, [project]);

  if (!project) return null;

  const main = (
    <div ref={containerRef} className="min-w-0 space-y-4">
      <div className="flex items-center justify-between" data-reveal>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base px-3 py-1.5 text-sm font-medium text-base-foreground transition hover:bg-base-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div data-reveal>
        <ProjectCarousel
          images={project.images}
          title={project.title}
          currentIndex={currentImageIndex}
          onChangeIndex={onImageChange}
        />
      </div>

      <div
        className="flex flex-wrap items-start justify-between gap-3"
        data-reveal
      >
        <div className="flex items-center gap-3">
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
        <div className="flex flex-wrap items-center gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-base-300 bg-base px-3 py-1 text-xs font-semibold text-base-foreground/90"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border border-base-300 bg-base-200/60 p-4 md:p-5"
        data-reveal
      >
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-base-foreground/70">
          Brief
        </h3>
        <p className="whitespace-pre-line leading-relaxed text-base text-base-foreground/90">
          {project.description || "No description available."}
        </p>
      </div>
    </div>
  );

  if (!isFullscreen) {
    return <div className="h-full overflow-y-auto pr-1">{main}</div>;
  }

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="grid min-h-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">{main}</div>
        <SuggestedProjects
          projects={projects}
          activeId={project.id}
          onSelect={onSelectProject}
        />
      </div>
    </div>
  );
};

export default React.memo(ProjectDetailView);
