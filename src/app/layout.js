import { Georama, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "react-vertical-timeline-component/style.min.css";

const georama = Georama({
  subsets: ["latin"],
  variable: "--font-georama",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  verification: {
    google: "1ZopRgwzU2_JK9VH8wg6Y9JabDzIUWPxcje5cPBVU8k",
  },
  title: "Vũ Đình Thái",
  description:
    "Thai Vu - Backend Developer specializing in Node.js, Express.js, MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${georama.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
