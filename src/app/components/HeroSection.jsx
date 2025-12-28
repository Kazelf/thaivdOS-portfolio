"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsapClient";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const setUpTextHover = (container, type) => {
  if (!container) return () => {};
  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = (e) =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanUp = setUpTextHover(titleRef.current, "title");
    const subtitleCleanUp = setUpTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanUp();
      subtitleCleanUp();
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex flex-col items-center gap-10 select-none cursor-default fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
    >
      {/* <Image
        src={"/images/thai.png"}
        alt="Thai's Image"
        width={240}
        height={240}
        className="rounded-full bg-base/40 backdrop-blur-3xl"
      /> */}
      <div>
        <p ref={subtitleRef}>
          {renderText(
            "Hey, welcome to my portfolio! I'm",
            "text-xl md:text-3xl font-georama text-primary-foreground",
            100
          )}
        </p>
        <h1 ref={titleRef}>
          {renderText(
            "Vu Dinh Thai",
            "text-4xl text-primary-foreground md:text-8xl italic font-georama"
          )}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
