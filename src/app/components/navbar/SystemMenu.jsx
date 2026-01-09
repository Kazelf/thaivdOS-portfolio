import React from "react";
import { useSystemStore, useWindowStore } from "@/app/store";
import MenuWrapper from "@/app/hoc/MenuWrapper";

const SystemMenu = () => {
  const { setLogin, closeMenu } = useSystemStore();
  const { resetAllWindows } = useWindowStore();

  return (
    <>
      <div className="w-full flex justify-between items-center py-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
            resetAllWindows();
            setLogin(false);
          }}
          aria-label={"lock"}
          className="rounded-md hover:bg-base-300 w-full text-left px-3 py-1"
        >
          Lock Screen
        </button>
      </div>

      <hr className="my-2 opacity-20" />
    </>
  );
};

const SystemMenuWrapped = MenuWrapper(SystemMenu, "system");

export default SystemMenuWrapped;
