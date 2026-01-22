import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { socialLinks } from "../constants";

const VSCode = () => {
  return (
    <div className="window w-3xl h-[90vh]">
      <div className="window-header">
        <WindowControls target="vscode" />
        <h2 className="w-full">Visual Studio Code</h2>
      </div>

      <div className="window-content p-0! h-full">
        <iframe
          className="size-full bg-[#202020]"
          src="https://github1s.com/Kazelf/thaivdOS-portfolio/blob/main/README.md"
          title="VSCode"
        />
      </div>
    </div>
  );
};

const VSCodeWindow = WindowWrapper(VSCode, "vscode");

export default VSCodeWindow;
