"use client";
import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { WindowControls } from "../components";
import { socialLinks } from "../constants";

const Contact = () => {
  return (
    <div className="window w-2xl">
      <div className="window-header">
        <WindowControls target="contact" />
        <h2 className="w-full">Contact me</h2>
      </div>

      <div className="p-5 space-y-5 bg-base">
        <Image
          src={"/images/vudinhthai.png"}
          alt="Image of Thai"
          width={80}
          height={80}
          className="rounded-full"
        />

        <h3 className="font-bold">Let's connect</h3>
        <p>Got an idea? Or just wanna talk tech? Contact me now!</p>
        <p>
          <span className="font-semibold">My Email:</span>{" "}
          vudinhthai081106@gmail.com
        </p>

        <ul className="grid grid-cols-4 gap-2">
          {socialLinks.map((item) => (
            <li
              className="p-2 col-span-1 rounded-lg transition-transform duration-200 ease-out hover:scale-105"
              key={item.id}
              style={{ backgroundColor: item.bg }}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={item.text}
              >
                <img src={item.icon} alt={item.text} className="w-6 h-6 mb-4" />
                <p className="text-sm text-white font-semibold">{item.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
