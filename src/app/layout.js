import { Georama, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./styles/globals.css";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${georama.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
