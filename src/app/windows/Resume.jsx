import React from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import { SquareArrowOutUpRightIcon } from "lucide-react";

// Header slot: tên file + nút mở PDF
const ResumeHeaderSlot = () => (
  <>
    <h2 className="w-full">Resume.pdf</h2>
    <a href="/files/resume.pdf" target="_blank">
      <SquareArrowOutUpRightIcon className="icon" />
    </a>
  </>
);

const Resume = () => {
  return (
    <div className="window-footer">
      <h2 className="w-full">Resume.pdf</h2>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume", {
  windowClassName: "w-125 h-50 bg-black text-white rounded-2xl font-mono",
  HeaderSlot: ResumeHeaderSlot,
});

export default ResumeWindow;
