import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, image } = data;

  return (
    <div className="p-4">
      <div className="relative w-full h-96">
        {image && (
          <Image src={image} alt={name} fill className="object-contain" />
        )}
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(ImageFile, "imgfile", {
  windowClassName: "window w-lg",
  title: (data) => data?.name,
});

export default ImageWindow;
