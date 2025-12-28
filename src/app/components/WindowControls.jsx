import React from "react";
import useWindowStore from "../store/window";
import { XIcon } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div
      onClick={() => closeWindow(target)}
      className="p-1 cursor-pointer rounded-md hover:bg-red-400 hover:text-white"
    >
      <XIcon className="h-5 w-5" />
    </div>
  );
};

export default WindowControls;
