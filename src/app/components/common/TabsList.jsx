"use client";
import React from "react";
import clsx from "clsx";

const SelectableList = ({
  items = [],
  activeId,
  onSelect,
  getKey = (item) => item?.id,
  listClassName = "",
  itemClassName = "",
  activeClassName = "active",
  inactiveClassName = "not-active",
  renderItem,
}) => {
  return (
    <ul className={listClassName}>
      {items.map((item, index) => {
        const key = getKey(item, index) ?? index;
        const itemId = item?.id ?? item;
        const isActive = itemId === activeId;

        return (
          <li
            key={key}
            onClick={() => onSelect?.(item)}
            className={clsx(
              itemClassName,
              isActive ? activeClassName : inactiveClassName,
            )}
          >
            {renderItem ? renderItem(item, isActive) : <span>{String(item)}</span>}
          </li>
        );
      })}
    </ul>
  );
};

const TabsList = ({ title, titleClassName = "", className = "", ...listProps }) => {
  return (
    <section className={className}>
      {title ? <h3 className={titleClassName}>{title}</h3> : null}
      <SelectableList {...listProps} />
    </section>
  );
};

export { SelectableList };
export default React.memo(TabsList);
