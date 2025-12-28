"use client";
import React from "react";

import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const Resume = () => {
  return (
    <div className="w-125 h-50 bg-black text-white rounded-2xl font-mono">
      <div className="window-header">
        <WindowControls target="resume" />
        <h2 className="w-full">Resume.pdf</h2>

        <a href="/files/resume.pdf" target="_blank">
          <SquareArrowOutUpRightIcon className="icon" />
        </a>
      </div>

      {/* <iframe
        src={"/files/resume.pdf"}
        width="100%"
        height="100%"
        title="PDF Viewer"
      /> */}

      <div className="window-footer">
        <h2 className="w-full">Resume.pdf</h2>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
