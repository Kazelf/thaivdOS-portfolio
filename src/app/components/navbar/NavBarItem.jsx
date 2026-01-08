import React from "react";
import clsx from "clsx";

const NavBarItem = ({ name, active, onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={name}
      className={clsx(
        "rounded-md",
        active
          ? "bg-neutral-300 text-neutral-foreground"
          : "hover:bg-neutral-300 hover:text-neutral-foreground"
      )}
    >
      {children}
    </button>
  );
};

export default NavBarItem;
