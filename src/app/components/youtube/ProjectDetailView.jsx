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
      <button
        type="button"
        data-reveal
        onClick={onBack}
        className="inline-flex items-center pr-3 rounded-full bg-base text-sm text-base-foreground hover:bg-base-200"
      >
        <ArrowLeft className="icon" />
        Back
      </button>

      <div data-reveal>
        <ProjectCarousel images={project.images} title={project.title} />
      </div>

      <div
        className="flex flex-wrap items-start justify-between gap-3"
        data-reveal
      >
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full p-1 object-cover"
            src={"/images/vudinhthai.png"}
            height={40}
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
        {Array.isArray(project.descriptionBlocks) &&
        project.descriptionBlocks.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base-foreground/90">
            {project.descriptionBlocks.map((para, index) => (
              <p
                key={`${project.id}-brief-${index}`}
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>
        ) : (
          <p className="whitespace-pre-line leading-relaxed text-base-foreground/90">
            No description available.
          </p>
        )}

        <hr className="my-2 text-base-300" />

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-foreground/70">
          Links
        </h3>
        <div className="space-y-2">
          {project.links?.[0] && (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-base-foreground/70">
              Production:{" "}
              <a
                href={project.links[0]}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-sm text-primary transition hover:underline"
              >
                {project.links[0]}
              </a>
            </p>
          )}
          <br />
          {project.links?.[1] && (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-base-foreground/70">
              Source:{" "}
              <a
                href={project.links[1]}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-sm text-primary transition hover:underline"
              >
                {project.links[1]}
              </a>
            </p>
          )}
          {!project.links?.[0] && !project.links?.[1] && (
            <p className="text-sm text-base-foreground/70">
              No links available.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (!isFullscreen) {
    return <div className="h-full overflow-y-auto pr-1">{main}</div>;
  }

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="grid min-h-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">{main}</div>
        <SuggestedProjects projects={projects} onSelect={onSelectProject} />
      </div>
    </div>
  );
};

export default React.memo(ProjectDetailView);
