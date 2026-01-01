"use client";
import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import useWindowStore from "../store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) {
    return (
      <div className="window w-lg">
        <div className="window-header">
          <WindowControls target="txtfile" />
        </div>
      </div>
    );
  }
  const { name, image, subtitle, description } = data;

  return (
    <div className="window w-lg">
      <div className="window-header">
        <WindowControls target="txtfile" />
        <h2 className="flex-1">{name}</h2>
      </div>

      <div className="window-content">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="rounded-lg"
          />
        ) : null}
        {subtitle ? <h2 className="font-semibold my-3">{subtitle}</h2> : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed">
            {description.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
