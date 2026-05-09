"use client";
import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapClient";

const ProjectCarousel = ({ images, title, currentIndex, onChangeIndex }) => {
  const frameRef = useRef(null);
  const safeImages = useMemo(
    () => (images?.length ? images : ["/images/wallpaper.png"]),
    [images],
  );

  useGSAP(
    () => {
      if (!frameRef.current) return;
      gsap.fromTo(
        frameRef.current,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [currentIndex] },
  );

  const canNavigate = safeImages.length > 1;
  const prev = () =>
    onChangeIndex(
      currentIndex === 0
        ? safeImages.length - 1
        : Math.max(0, currentIndex - 1),
    );
  const next = () =>
    onChangeIndex(
      currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1,
    );

  return (
    <div className="relative overflow-hidden border border-base-foreground">
      <img
        ref={frameRef}
        src={safeImages[currentIndex]}
        alt={title}
        className="h-[34vh] w-full object-cover md:h-[42vh]"
      />

      {canNavigate && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-base-300 bg-base/85 p-2 text-base-foreground transition hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-base-300 bg-base/85 p-2 text-base-foreground transition hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-base-300/80 bg-base/70 px-3 py-1.5 backdrop-blur-sm">
        {safeImages.map((img, idx) => (
          <button
            type="button"
            key={`${img}-${idx}`}
            onClick={() => onChangeIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              idx === currentIndex ? "bg-red-400" : "bg-base-300"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProjectCarousel);
