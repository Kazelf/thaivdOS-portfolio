import React from "react";

const MenuBarButton = ({ onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default MenuBarButton;
