import React from "react";

const NavBarItem = ({ onClick, children }) => {
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

export default NavBarItem;
