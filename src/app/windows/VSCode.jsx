import React from "react";
import WindowWrapper from "../hoc/WindowWrapper";

const VSCode = () => {
  return (
    <div className="window-content p-0! h-full">
      <iframe
        className="size-full bg-[#202020]"
        src="https://github1s.com/Kazelf/thaivdOS-portfolio/blob/main/README.md"
        title="VSCode"
      />
    </div>
  );
};

const VSCodeWindow = WindowWrapper(VSCode, "vscode", {
  title: "Visual Studio Code",
  windowClassName: "window w-4xl h-[90vh]",
});

export default VSCodeWindow;
