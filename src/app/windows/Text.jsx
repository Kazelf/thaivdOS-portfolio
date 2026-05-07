import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <div className="window-content">
      {image && (
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="rounded-lg"
        />
      )}
      {subtitle && <h2 className="font-semibold my-3">{subtitle}</h2>}

      {Array.isArray(description) && description.length > 0 && (
        <div className="space-y-3 leading-relaxed">
          {description.map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </div>
      )}
    </div>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile", {
  windowClassName: "window w-lg xl:max-h-[70vh]!",
  title: (data) => data?.name,
});

export default TextWindow;
