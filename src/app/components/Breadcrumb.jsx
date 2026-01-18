import React from "react";
import useFolderStore from "../store/folder";

const Breadcrumb = () => {
  const { path, jumpTo } = useFolderStore();

  return (
    <nav className="flex items-center gap-2 px-3 py-2 text-sm overflow-x-auto whitespace-nowrap">
      {path.map((item, index) => (
        <React.Fragment key={item.id}>
          <button
            aria-label={item.name}
            onClick={() => jumpTo(index)}
            className="text-blue-600"
          >
            {item.name}
          </button>
          {index < path.length - 1 && <span>{">"}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
