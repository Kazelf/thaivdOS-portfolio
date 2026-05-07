import React from "react";
import clsx from "clsx";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Briefcase, Calendar, Trophy } from "lucide-react";

import WindowWrapper from "../hoc/WindowWrapper";
import SafariHeaderSlot from "../components/headerslot/SafariHeaderSlot";
import { activities, experiences, achievements } from "../constants";
import useSystemStore from "../store/system";

const Safari = () => {
  const { wifi } = useSystemStore();

  const renderTimeLine = (title, items, Icon) => (
    <div className="bg-base p-2 rounded-2xl">
      <h2 className="font-bold text-xl mb-3">{title}</h2>
      <VerticalTimeline lineColor="var(--color-primary)" layout="1-column-left">
        {items.map(({ id, date, title, role, description }) => (
          <VerticalTimelineElement
            key={id}
            icon={<Icon />}
            contentArrowStyle={{ display: "none" }}
            contentStyle={{
              font: "normal",
              background: "var(--color-base-300)",
              paddingBottom: 0,
            }}
            iconStyle={{
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            <p className="text-base-foreground/50">{date}</p>
            <h3 className="text-lg font-semibold">{title}</h3>
            <h4 className="text-sm text-primary-300">{role}</h4>
            {Array.isArray(description) && description.length > 0 && (
              <ul className="ml-2 list-disc leading-relaxed pt-2">
                {description.map((para, i) => (
                  <li key={i}>
                    <p>{para}</p>
                  </li>
                ))}
              </ul>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );

  return (
    <div
      className={clsx(
        "window-content grid gap-3 max-md:grid-cols-1 max-md:gap-10",
        wifi && "grid-cols-2",
      )}
    >
      {wifi ? (
        <>
          <div className="flex flex-col gap-10">
            {renderTimeLine("Experiences", experiences, Briefcase)}
            {renderTimeLine("Activities", activities, Calendar)}
          </div>
          <div>{renderTimeLine("Achievements", achievements, Trophy)}</div>
        </>
      ) : (
        <p className="m-auto text-2xl font-bold text-base-foreground/70">
          You have no internet
        </p>
      )}
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari", {
  windowClassName: "w-3xl h-[70vh] window",
  HeaderSlot: SafariHeaderSlot,
});

export default SafariWindow;
