import { useEffect, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export function useClickOutside(
  ref,
  onClickOutside,
  excludeRefs = [],
  events = defaultEvents
) {
  const savedCallback = useRef(onClickOutside);

  // Always keep latest callback
  useEffect(() => {
    savedCallback.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handler = (event) => {
      // Ignore clicks on excluded elements
      for (const excludeRef of excludeRefs) {
        const excludeEl = excludeRef?.current;
        if (excludeEl && excludeEl.contains(event.target)) {
          return;
        }
      }

      const el = ref?.current;
      if (!el || el.contains(event.target)) return;

      savedCallback.current(event);
    };

    events.forEach((eventName) =>
      document.addEventListener(eventName, handler)
    );

    return () => {
      events.forEach((eventName) =>
        document.removeEventListener(eventName, handler)
      );
    };
  }, [ref, excludeRefs, events]);
}
