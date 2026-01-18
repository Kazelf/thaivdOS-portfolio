import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import useWindowStore from "../store/window";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) {
    return (
      <div className="window w-lg">
        <div className="window-header">
          <WindowControls target="imgfile" />
        </div>
      </div>
    );
  }
  const { name, image } = data;

  return (
    <div className="window w-lg">
      <div className="window-header">
        <WindowControls target="imgfile" />
        <h2 className="w-full">{name}</h2>
      </div>

      <div className="p-4">
        <div className="relative w-full h-96">
          {image && (
            <Image src={image} alt={name} fill className="object-contain" />
          )}
        </div>
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageWindow;
