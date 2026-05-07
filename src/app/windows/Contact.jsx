import React from "react";
import Image from "next/image";
import WindowWrapper from "../hoc/WindowWrapper";
import { socialLinks } from "../constants";
import useWindowStore from "../store/window";

const Contact = () => {
  const isFullscreen = useWindowStore(
    (state) => state.windows.contact?.isFullscreen,
  );

  return (
    <div className="window-content space-y-5">
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
        <strong>My Email:</strong> vudinhthai081106@gmail.com
      </p>

      <ul
        className={`grid grid-cols-4 max-md:grid-cols-1 gap-2 ${
          isFullscreen ? "h-[calc(100%-18rem)]" : ""
        }`}
      >
        {socialLinks.map((item) => (
          <li
            className={`p-2 col-span-1 rounded-lg transition-transform duration-200 ease-out hover:scale-105 ${
              isFullscreen ? "h-full min-h-28" : ""
            }`}
            key={item.id}
            style={{ backgroundColor: item.bg }}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              title={item.text}
              className={
                isFullscreen ? "h-full flex flex-col justify-center" : ""
              }
            >
              <img
                src={item.icon}
                alt={item.text}
                className={`mb-4 ${isFullscreen ? "w-10 h-10" : "w-7 h-7"}`}
              />
              <p
                className={`text-white font-semibold ${
                  isFullscreen ? "text-lg" : "text-base"
                }`}
              >
                {item.text}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact", {
  title: "Contact me",
  windowClassName: "window w-2xl",
});

export default ContactWindow;
