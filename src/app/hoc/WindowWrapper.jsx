import React from "react";
import WindowWrapperClient from "./WindowWrapper.client";

/**
 * @param {React.Component} Component
 * @param {string} windowKey
 * @param {{ title?: string | ((data: any) => string), windowClassName?: string, HeaderSlot?: React.Component }} options
 */
const WindowWrapper = (Component, windowKey, options = {}) => {
  const Wrapped = (props) => {
    return (
      <WindowWrapperClient
        Component={Component}
        windowKey={windowKey}
        {...options}
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
