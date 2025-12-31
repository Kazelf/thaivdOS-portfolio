"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Trophy,
} from "lucide-react";

import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { activities, experiences, achievements } from "../constants";

const Safari = () => {
  const renderTimeLine = (title, items, Icon) => (
    <div className="bg-base-200 p-2 rounded-2xl">
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
            {Array.isArray(description) && description.length > 0 ? (
              <ul className="ml-2 list-disc leading-relaxed pt-2">
                {description.map((para, i) => (
                  <li key={i}>
                    <p>{para}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );

  return (
    <div className="w-3xl max-sm:w-2xl window">
      <div className="window-header gap-4">
        <WindowControls target="safari" />

        <PanelLeft className="icon ml-10" />

        <div className="flex items-center">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex flex-1 p-1 bg-base rounded border border-base-300">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search or enter website name"
            className="flex-1 font-normal"
          />
        </div>

        <div className="flex items-center ml-10 gap-5">
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="window-content grid grid-cols-2 gap-3 max-md:grid-cols-1 max-md:gap-10">
        <div className="flex flex-col gap-10">
          {renderTimeLine("Activities", activities, Calendar)}
          {renderTimeLine("Experiences", experiences, Briefcase)}
        </div>
        <div>{renderTimeLine("Achievements", achievements, Trophy)}</div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
