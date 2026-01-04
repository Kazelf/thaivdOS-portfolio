import React from "react";
import MenuWrapperClient from "./MenuWrapper.client";

const MenuWrapper = (Component, menuKey) => {
  const Wrapped = (props) => {
    return (
      <MenuWrapperClient Component={Component} menuKey={menuKey} {...props} />
    );
  };

  Wrapped.displayName = `MenuWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default MenuWrapper;
