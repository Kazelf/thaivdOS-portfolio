"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapClient";

const ProjectCarousel = ({ images, title }) => {
  const frameRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeImages = useMemo(
    () => (images?.length ? images : ["/images/wallpaper.png"]),
    [images],
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

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

  const prev = () =>
    setCurrentIndex(
      currentIndex === 0
        ? safeImages.length - 1
        : Math.max(0, currentIndex - 1),
    );
  const next = () =>
    setCurrentIndex(
      currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1,
    );

  return (
    <div className="relative h-[34vh] md:h-[42vh] rounded-xl bg-black/80 overflow-hidden border border-base-foreground">
      <img
        ref={frameRef}
        src={safeImages[currentIndex]}
        alt={title}
        className="h-full mx-auto"
      />

      {safeImages.length > 1 && (
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
            onClick={() => setCurrentIndex(idx)}
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
