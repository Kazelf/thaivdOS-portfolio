"use client";
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { gsap } from "@/lib/gsapClient";
import { useClickOutside } from "../hooks";

const Login = ({ setLogin }) => {
  const clockRef = useRef(null);
  const isUnlocking = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(dayjs());

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleUnlock = () => {
    if (isUnlocking.current) return;
    isUnlocking.current = true;

    gsap.to(".login-blur", {
      backdropFilter: "blur(0px)",
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });

    gsap.to(".login-content", {
      scale: 1.1,
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut",
      onComplete: setLogin,
    });
  };

  useClickOutside(clockRef, handleUnlock);

  if (!mounted) return null;

  return (
    <>
      <div className="login-blur absolute inset-0 backdrop-blur-xl bg-blur-bg/15" />

      <div
        className="login-content flex flex-col items-center text-white font-georama absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2"
      >
        <p className="mb-10 text-2xl italic text-center font-semibold hover:animate-spin">
          WELCOME TO THAIVD OS
        </p>

        <div
          ref={clockRef}
          className="mb-3 flex flex-col gap-5 items-center p-4 px-8 
          bg-base/40 backdrop-blur-xl rounded-xl"
        >
          <time className="text-xl font-medium">{now.format("MMM D")}</time>
          <time className="text-7xl font-medium">{now.format("HH")}</time>
          <div>
            <time className="text-5xl mr-4 font-medium">
              {now.format("mm")}
            </time>
            <time className="font-medium">{now.format("ss")}</time>
          </div>
        </div>

        <p className="text-center">click anywhere</p>
      </div>
    </>
  );
};

export default Login;
