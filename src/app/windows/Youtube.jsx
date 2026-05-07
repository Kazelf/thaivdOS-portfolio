import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";

const Youtube = () => {
  return <div className="window-content"></div>;
};

const YoutubeWindow = WindowWrapper(Youtube, "youtube", {
  title: "My Projects",
  windowClassName: "window w-2xl",
});

export default YoutubeWindow;
