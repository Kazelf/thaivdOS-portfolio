import React from "react";
import WindowWrapperClient from "./WindowWrapper.client";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    return (
      <WindowWrapperClient
        Component={Component}
        windowKey={windowKey}
        {...props}
      />
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
