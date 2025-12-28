"use client";
import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import useWindowStore from "../store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;
  const { name, image, subtitle, description } = data;

  return (
    <div className="window w-lg">
      <div className="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="bg-base p-4">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={30}
            height={30}
            className="rounded"
          />
        ) : null}
        {subtitle ? <h2 className="font-semibold">{subtitle}</h2> : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed">
            {description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
