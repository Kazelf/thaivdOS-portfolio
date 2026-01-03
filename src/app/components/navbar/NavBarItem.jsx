import React from "react";
import clsx from "clsx";

const NavBarItem = ({ active, onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        "rounded-md",
        active
          ? "bg-base-300 text-neutral-200"
          : "hover:bg-base-300 hover:text-neutral-200"
      )}
    >
      {children}
    </button>
  );
};

export default NavBarItem;
